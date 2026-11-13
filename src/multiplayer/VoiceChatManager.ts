/**
 * ECHO – THE WORLD REMEMBERS
 * Real-Time Live WebRTC Voice Chat Manager
 *
 * Implements:
 * 1. Explicit pre-permission workflow before calling navigator.mediaDevices.getUserMedia().
 * 2. Real peer-to-peer WebRTC audio mesh (RTCPeerConnection) signaled over WebSocket.
 * 3. Strict scope: ONLY connects to peers in the same Room OR same Party.
 * 4. Persists seamlessly across Great Portal transitions (World 1 <-> World 2).
 * 5. Self mute/unmute, per-peer mute/unmute, master speaker volume control, & speaking detection.
 */

import { PlayerId, VoicePeerState } from './types.ts';

export interface VoiceSignalSender {
  sendVoiceState(enabled: boolean, muted: boolean, speaking: boolean): void;
  sendWebRTCSignal(
    targetPlayerId: PlayerId,
    signalType: 'offer' | 'answer' | 'ice',
    payload: { sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit }
  ): void;
}

interface PeerConnectionRecord {
  peerId: PlayerId;
  pc: RTCPeerConnection;
  audioEl: HTMLAudioElement;
  makingOffer: boolean;
  ignoreOffer: boolean;
  iceQueue: RTCIceCandidateInit[];
  connected: boolean;
  localMuted: boolean;
}

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

export class VoiceChatManager {
  public isEnabled = false;
  public isMuted = false;
  public isSpeaking = false;
  public speakerVolume = 0.85; // 0..1
  public lastError: string | null = null;

  private localStream: MediaStream | null = null;
  private localPlayerId: PlayerId = '';
  private peers = new Map<PlayerId, PeerConnectionRecord>();
  private peerStates = new Map<PlayerId, VoicePeerState>();
  private eligiblePeerIds = new Set<PlayerId>();

  // WebAudio speaking level monitor (local microphone)
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private analyserData: Uint8Array<ArrayBuffer> | null = null;
  private monitorTimer: number | null = null;
  private audioContainer: HTMLElement | null = null;

  public onStateChanged?: () => void;

  constructor(private signalSender: VoiceSignalSender) {
    try {
      const savedVol = localStorage.getItem('echo_voice_speaker_vol_v1');
      if (savedVol !== null) {
        const parsed = Number(savedVol);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
          this.speakerVolume = parsed;
        }
      }
    } catch {
      // ignore
    }
  }

  public setLocalPlayerId(playerId: PlayerId): void {
    this.localPlayerId = playerId;
  }

  public isSupported(): boolean {
    return Boolean(
      typeof navigator !== 'undefined' &&
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === 'function' &&
        typeof RTCPeerConnection !== 'undefined'
    );
  }

  /**
   * Called ONLY AFTER user explicitly clicks "Allow Microphone" in our in-app permission prompt.
   */
  public async enableVoice(): Promise<{ ok: boolean; error?: string }> {
    if (this.isEnabled && this.localStream) {
      return { ok: true };
    }
    if (!this.isSupported()) {
      const msg = 'Voice chat requires HTTPS/localhost with WebRTC and microphone support.';
      this.lastError = msg;
      this.onStateChanged?.();
      return { ok: false, error: msg };
    }

    try {
      this.lastError = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      this.localStream = stream;
      this.isEnabled = true;
      this.isMuted = false;

      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
        track.onended = () => {
          if (this.isEnabled) {
            this.disableVoice();
          }
        };
      });

      this.startSpeakingMonitor(stream);
      this.ensureAudioContainer();

      // Add local audio track to any existing peer connections and renegotiate cleanly
      for (const rec of this.peers.values()) {
        this.attachLocalTracksToPeer(rec);
      }

      // Connect to all currently eligible peers who also have voice active (or receive their audio)
      this.reconcilePeerConnections();

      this.signalSender.sendVoiceState(true, false, false);
      this.onStateChanged?.();
      return { ok: true };
    } catch (err: any) {
      let msg = 'Could not access microphone.';
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        msg = 'Microphone permission was denied. Please allow mic access in browser settings.';
      } else if (err?.name === 'NotFoundError' || err?.name === 'DevicesNotFoundError') {
        msg = 'No microphone device found on this device.';
      }
      this.lastError = msg;
      this.isEnabled = false;
      this.onStateChanged?.();
      return { ok: false, error: msg };
    }
  }

  public disableVoice(): void {
    this.isEnabled = false;
    this.isMuted = false;
    this.isSpeaking = false;
    this.stopSpeakingMonitor();

    if (this.localStream) {
      this.localStream.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch {
          // ignore
        }
      });
      this.localStream = null;
    }

    for (const peerId of Array.from(this.peers.keys())) {
      this.closePeer(peerId);
    }

    this.signalSender.sendVoiceState(false, false, false);
    this.onStateChanged?.();
  }

  public setMuted(muted: boolean): void {
    if (!this.isEnabled || !this.localStream) return;
    this.isMuted = muted;
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
    if (muted && this.isSpeaking) {
      this.isSpeaking = false;
    }
    this.signalSender.sendVoiceState(this.isEnabled, this.isMuted, this.isSpeaking);
    this.onStateChanged?.();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public setSpeakerVolume(vol: number): void {
    this.speakerVolume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('echo_voice_speaker_vol_v1', String(this.speakerVolume));
    } catch {
      // ignore
    }
    for (const rec of this.peers.values()) {
      rec.audioEl.volume = rec.localMuted ? 0 : this.speakerVolume;
      rec.audioEl.muted = rec.localMuted || this.speakerVolume <= 0.001;
    }
    this.onStateChanged?.();
  }

  public togglePeerMute(peerId: PlayerId): boolean {
    const state = this.peerStates.get(peerId);
    const nextMuted = !(state?.localMuted ?? false);
    if (state) {
      state.localMuted = nextMuted;
    }
    const rec = this.peers.get(peerId);
    if (rec) {
      rec.localMuted = nextMuted;
      rec.audioEl.muted = nextMuted || this.speakerVolume <= 0.001;
      rec.audioEl.volume = nextMuted ? 0 : this.speakerVolume;
    }
    this.onStateChanged?.();
    return nextMuted;
  }

  /**
   * Unlocks HTMLAudioElement playback after any user gesture (critical on iOS/Android & Chrome autoplay).
   */
  public unlockAudioPlayback(): void {
    for (const rec of this.peers.values()) {
      if (rec.audioEl.srcObject && rec.audioEl.paused) {
        rec.audioEl.play().catch(() => {
          // ignore if gesture not sufficient
        });
      }
    }
  }

  /**
   * Synchronizes the exact set of peers allowed to voice-chat with the local player
   * (same Room OR same Party). Any peer outside both is immediately disconnected.
   */
  public syncEligiblePeers(eligibleIds: Iterable<PlayerId>): void {
    this.eligiblePeerIds = new Set(eligibleIds);
    this.eligiblePeerIds.delete(this.localPlayerId);

    // Tear down any peer who is no longer in the same room or party
    for (const peerId of Array.from(this.peers.keys())) {
      if (!this.eligiblePeerIds.has(peerId)) {
        this.closePeer(peerId);
      }
    }
    for (const peerId of Array.from(this.peerStates.keys())) {
      if (!this.eligiblePeerIds.has(peerId)) {
        this.peerStates.delete(peerId);
      }
    }

    this.reconcilePeerConnections();
    this.onStateChanged?.();
  }

  public handleRemoteVoiceState(
    playerId: PlayerId,
    username: string,
    voice: { enabled: boolean; muted: boolean; speaking: boolean }
  ): void {
    if (playerId === this.localPlayerId) return;
    const prev = this.peerStates.get(playerId);
    this.peerStates.set(playerId, {
      playerId,
      username,
      enabled: voice.enabled,
      muted: voice.muted,
      speaking: voice.speaking,
      localMuted: prev?.localMuted ?? false,
      connected: this.peers.get(playerId)?.connected ?? false,
    });

    if (!voice.enabled && !this.isEnabled && this.peers.has(playerId)) {
      this.closePeer(playerId);
    } else {
      this.reconcilePeerConnections();
    }
    this.onStateChanged?.();
  }

  public removePeer(playerId: PlayerId): void {
    this.eligiblePeerIds.delete(playerId);
    this.peerStates.delete(playerId);
    this.closePeer(playerId);
    this.onStateChanged?.();
  }

  public getPeerStates(): VoicePeerState[] {
    return Array.from(this.peerStates.values());
  }

  public getPeerState(playerId: PlayerId): VoicePeerState | undefined {
    return this.peerStates.get(playerId);
  }

  private reconcilePeerConnections(): void {
    if (!this.localPlayerId) return;
    for (const peerId of this.eligiblePeerIds) {
      const remoteVoice = this.peerStates.get(peerId);
      const shouldConnect = this.isEnabled || Boolean(remoteVoice?.enabled);
      if (!shouldConnect) continue;

      if (!this.peers.has(peerId)) {
        // Deterministic initiator rule prevents dual-offer collisions
        const shouldInitiate = this.isEnabled && this.localPlayerId < peerId;
        this.createPeerConnection(peerId, shouldInitiate);
      }
    }
  }

  private ensureAudioContainer(): HTMLElement | null {
    if (typeof document === 'undefined') return null;
    if (!this.audioContainer) {
      this.audioContainer = document.createElement('div');
      this.audioContainer.id = 'echo-voice-audio-rack';
      this.audioContainer.style.display = 'none';
      document.body.appendChild(this.audioContainer);
    }
    return this.audioContainer;
  }

  private createPeerConnection(peerId: PlayerId, shouldInitiate: boolean): PeerConnectionRecord {
    const pc = new RTCPeerConnection(RTC_CONFIG);
    const audioEl = document.createElement('audio');
    audioEl.autoplay = true;
    (audioEl as any).playsInline = true;
    const peerState = this.peerStates.get(peerId);
    const localMuted = peerState?.localMuted ?? false;
    audioEl.muted = localMuted || this.speakerVolume <= 0.001;
    audioEl.volume = localMuted ? 0 : this.speakerVolume;
    this.ensureAudioContainer()?.appendChild(audioEl);

    const rec: PeerConnectionRecord = {
      peerId,
      pc,
      audioEl,
      makingOffer: false,
      ignoreOffer: false,
      iceQueue: [],
      connected: false,
      localMuted,
    };
    this.peers.set(peerId, rec);

    if (this.localStream) {
      this.attachLocalTracksToPeer(rec);
    } else if (typeof pc.addTransceiver === 'function') {
      // Allow listening to friends even before enabling own mic
      try {
        pc.addTransceiver('audio', { direction: 'recvonly' });
      } catch {
        // ignore
      }
    }

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        this.signalSender.sendWebRTCSignal(peerId, 'ice', {
          candidate: ev.candidate.toJSON(),
        });
      }
    };

    pc.ontrack = (ev) => {
      const stream = ev.streams[0] || new MediaStream([ev.track]);
      audioEl.srcObject = stream;
      audioEl.volume = rec.localMuted ? 0 : this.speakerVolume;
      audioEl.muted = rec.localMuted || this.speakerVolume <= 0.001;
      audioEl.play().catch(() => {
        // Autoplay may wait for next pointer/key gesture; unlocked via unlockAudioPlayback()
      });
      rec.connected = true;
      const st = this.peerStates.get(peerId);
      if (st) st.connected = true;
      this.onStateChanged?.();
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      rec.connected = state === 'connected';
      const st = this.peerStates.get(peerId);
      if (st) st.connected = rec.connected;
      if (state === 'failed' || state === 'closed') {
        this.closePeer(peerId);
      }
      this.onStateChanged?.();
    };

    pc.onnegotiationneeded = async () => {
      if (!this.isEnabled) return;
      try {
        rec.makingOffer = true;
        await pc.setLocalDescription();
        if (pc.localDescription) {
          this.signalSender.sendWebRTCSignal(peerId, 'offer', {
            sdp: pc.localDescription.toJSON(),
          });
        }
      } catch (err) {
        console.warn('WebRTC negotiation error:', err);
      } finally {
        rec.makingOffer = false;
      }
    };

    if (shouldInitiate) {
      void (async () => {
        try {
          rec.makingOffer = true;
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          if (pc.localDescription) {
            this.signalSender.sendWebRTCSignal(peerId, 'offer', {
              sdp: pc.localDescription.toJSON(),
            });
          }
        } catch (err) {
          console.warn('WebRTC initial offer error:', err);
        } finally {
          rec.makingOffer = false;
        }
      })();
    }

    return rec;
  }

  private attachLocalTracksToPeer(rec: PeerConnectionRecord): void {
    if (!this.localStream) return;
    const senders = rec.pc.getSenders();
    for (const track of this.localStream.getAudioTracks()) {
      const existing = senders.find((s) => s.track?.kind === 'audio');
      if (existing) {
        void existing.replaceTrack(track);
      } else {
        rec.pc.addTrack(track, this.localStream);
      }
    }
  }

  public async handleSignal(
    fromPlayerId: PlayerId,
    signalType: 'offer' | 'answer' | 'ice',
    sdp?: RTCSessionDescriptionInit,
    candidate?: RTCIceCandidateInit
  ): Promise<void> {
    if (!this.eligiblePeerIds.has(fromPlayerId)) return;

    let rec = this.peers.get(fromPlayerId);
    if (!rec) {
      rec = this.createPeerConnection(fromPlayerId, false);
    }

    const pc = rec.pc;
    const polite = this.localPlayerId > fromPlayerId;

    try {
      if ((signalType === 'offer' || signalType === 'answer') && sdp) {
        const offerCollision =
          sdp.type === 'offer' && (rec.makingOffer || pc.signalingState !== 'stable');
        rec.ignoreOffer = !polite && offerCollision;
        if (rec.ignoreOffer) return;

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        if (sdp.type === 'offer') {
          if (this.localStream) {
            this.attachLocalTracksToPeer(rec);
          }
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          if (pc.localDescription) {
            this.signalSender.sendWebRTCSignal(fromPlayerId, 'answer', {
              sdp: pc.localDescription.toJSON(),
            });
          }
        }

        // Flush queued ICE candidates once remote description is set
        while (rec.iceQueue.length > 0) {
          const cand = rec.iceQueue.shift()!;
          await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
        }
      } else if (signalType === 'ice' && candidate) {
        if (!pc.remoteDescription) {
          rec.iceQueue.push(candidate);
        } else {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch {
            if (!rec.ignoreOffer) {
              // ignore late candidates
            }
          }
        }
      }
    } catch (err) {
      console.warn('WebRTC handleSignal failed:', err);
    }
  }

  private closePeer(peerId: PlayerId): void {
    const rec = this.peers.get(peerId);
    if (!rec) return;
    this.peers.delete(peerId);
    try {
      rec.audioEl.srcObject = null;
      rec.audioEl.remove();
    } catch {
      // ignore
    }
    try {
      rec.pc.onicecandidate = null;
      rec.pc.ontrack = null;
      rec.pc.onnegotiationneeded = null;
      rec.pc.onconnectionstatechange = null;
      rec.pc.close();
    } catch {
      // ignore
    }
  }

  private startSpeakingMonitor(stream: MediaStream): void {
    this.stopSpeakingMonitor();
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.audioCtx = new AudioCtx();
      const source = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);
      const buffer = new ArrayBuffer(this.analyser.frequencyBinCount);
      this.analyserData = new Uint8Array(buffer);

      this.monitorTimer = window.setInterval(() => {
        if (!this.analyser || !this.analyserData || !this.isEnabled || this.isMuted) {
          if (this.isSpeaking) {
            this.isSpeaking = false;
            this.signalSender.sendVoiceState(this.isEnabled, this.isMuted, false);
            this.onStateChanged?.();
          }
          return;
        }
        this.analyser.getByteTimeDomainData(this.analyserData);
        let sumSq = 0;
        for (let i = 0; i < this.analyserData.length; i++) {
          const v = (this.analyserData[i] - 128) / 128;
          sumSq += v * v;
        }
        const rms = Math.sqrt(sumSq / this.analyserData.length);
        const nowSpeaking = rms > 0.032;
        if (nowSpeaking !== this.isSpeaking) {
          this.isSpeaking = nowSpeaking;
          this.signalSender.sendVoiceState(this.isEnabled, this.isMuted, this.isSpeaking);
          this.onStateChanged?.();
        }
      }, 150);
    } catch {
      // Non-critical if WebAudio analyser unavailable
    }
  }

  private stopSpeakingMonitor(): void {
    if (this.monitorTimer !== null) {
      clearInterval(this.monitorTimer);
      this.monitorTimer = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    this.analyser = null;
    this.analyserData = null;
  }

  public dispose(): void {
    this.disableVoice();
    if (this.audioContainer) {
      this.audioContainer.remove();
      this.audioContainer = null;
    }
  }
}
