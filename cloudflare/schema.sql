-- ECHO – THE WORLD REMEMBERS
-- Cloudflare D1 Database Schema (Player Profiles, Cloud Saves, Rooms, Friendships & Chat)

CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  title_ar TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  character_class TEXT NOT NULL DEFAULT 'SPIRIT_WEAVER',
  robe_color TEXT NOT NULL DEFAULT '#1d4ed8',
  aura_color TEXT NOT NULL DEFAULT '#00f5d4',
  level INTEGER NOT NULL DEFAULT 1,
  echo_mastery INTEGER NOT NULL DEFAULT 0,
  last_room_id TEXT DEFAULT 'ECHO-PUBLIC-1',
  last_realm TEXT DEFAULT 'ISLAND',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS player_saves (
  player_id TEXT PRIMARY KEY,
  save_json TEXT NOT NULL,
  dark_progress_json TEXT,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  room_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  host_player_id TEXT NOT NULL,
  is_private INTEGER NOT NULL DEFAULT 0,
  passcode_hash TEXT,
  snapshot_json TEXT NOT NULL,
  player_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS friendships (
  player_id TEXT NOT NULL,
  friend_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (player_id, friend_id)
);

CREATE TABLE IF NOT EXISTS chat_history (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_color TEXT NOT NULL DEFAULT '#00f5d4',
  realm TEXT NOT NULL DEFAULT 'ISLAND',
  channel TEXT NOT NULL DEFAULT 'ROOM',
  text TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_players_username ON players(username);
CREATE INDEX IF NOT EXISTS idx_rooms_updated ON rooms(is_private, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_room_time ON chat_history(room_id, created_at DESC);
