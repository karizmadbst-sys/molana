# ECHO – THE WORLD REMEMBERS: Cloudflare + GitHub Pages Deployment Guide

This guide sets up **real online multiplayer** with **GitHub Pages** (static game frontend) and **Cloudflare Workers + Durable Objects + Cloudflare D1** (real-time WebSocket server & persistent cloud database).

---

## Architecture Summary

- **Frontend (GitHub Pages)**: Static bundle (`dist/`) built by `.github/workflows/deploy-pages.yml`. Connects via `wss://` WebSockets and `https://` REST APIs. Works on PC browsers and mobile devices with relative asset paths (`./`).
- **Real-Time Server (Cloudflare Workers + Durable Objects)**:
  - `EchoRoomDO`: Per-room WebSocket Hibernation server synchronizing positions, locomotion/combat animations, pistol & bow shots, chat, voxel building, enemies, harvest nodes, world quests, and portal travel across **World 1 (`ISLAND`)** and **World 2 (`DARK_REALM`)**.
  - `EchoLobbyDO`: Global room directory, online presence, friend lists, cross-room party sync, and real-time room/party invitations.
- **Database (Cloudflare D1)**: Stores player profiles (`players`), cloud progress & inventory saves (`player_saves`), room snapshots/voxel builds (`rooms`), friend relationships (`friendships`), and chat logs (`chat_history`).

---

## Part 1 — Deploy the Cloudflare Backend (Workers + Durable Objects + D1)

### 1. Install Wrangler & Authenticate
```bash
cd cloudflare
npm install
npx wrangler login
```

### 2. Create the Cloudflare D1 Database
```bash
npx wrangler d1 create echo-multiplayer-db
```
Copy the printed `database_id` (UUID) and paste it into `cloudflare/wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "echo-multiplayer-db"
database_id = "YOUR_COPIED_D1_DATABASE_ID"
```

### 3. Apply the D1 Schema
```bash
npx wrangler d1 execute echo-multiplayer-db --remote --file=./schema.sql
```

### 4. Set Your Auth Signing Secret & Allowed Origins
Generate a strong secret key for HMAC-SHA256 session tokens:
```bash
npx wrangler secret put JWT_SECRET
```
(Optional for stricter production CORS) Update `ALLOWED_ORIGINS` in `cloudflare/wrangler.toml` to include your GitHub Pages origin, e.g.:
```toml
[vars]
ALLOWED_ORIGINS = "https://YOUR_GITHUB_USERNAME.github.io,http://localhost:3000"
```

### 5. Deploy the Cloudflare Worker + Durable Objects
```bash
npm run deploy
```
Note the deployed Worker URL printed by Wrangler, for example:
`https://echo-multiplayer-worker.<your-subdomain>.workers.dev`

Verify it works:
```bash
curl https://echo-multiplayer-worker.<your-subdomain>.workers.dev/api/health
```
You should receive `{ "ok": true, "durableObjects": true, "d1Ready": true, ... }`.

---

## Part 2 — Deploy the Static Frontend to GitHub Pages

### 1. Set Repository Variables
In your GitHub repository:
1. Go to **Settings → Secrets and variables → Actions → Variables** (tab **Variables**).
2. Add two repository variables:
   - `VITE_MULTIPLAYER_WS_URL` = `wss://echo-multiplayer-worker.<your-subdomain>.workers.dev/ws`
   - `VITE_MULTIPLAYER_API_URL` = `https://echo-multiplayer-worker.<your-subdomain>.workers.dev`

### 2. Enable GitHub Pages
1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

### 3. Trigger Deployment
Push to `main` (or `master`), or go to **Actions → Deploy Static Frontend to GitHub Pages → Run workflow**.
Once finished, your game will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## Part 3 — Playing With Friends & Features

- **Join by Room Code or Link**:
  - Open the **Multiplayer Hub** (`🌍` button on HUD) → **Rooms**.
  - Click **Create Room** to host a public or private world (`ROOM-XXXXX`), or click **🔗 Invite Link** to copy a direct `?room=...` link for friends.
- **Travel Together Through the Portal**:
  - Entering the **Great Portal** (Island → Dark Realm) or **Return Portal** (Dark Realm → Island) broadcasts a synchronized portal prompt so party/room friends can click **Travel Together · السفر معاً** to enter the same realm together.
- **Cloudflare D1 Cloud Save**:
  - Local `localStorage` saves remain preserved, and every save automatically backs up to Cloudflare D1 (or click **☁️ Save Cloud** / **⬇️ Restore** in **Multiplayer Hub → Voice & ID**).
- **Custom Server Override (Runtime)**:
  - Even without rebuilding, any player can paste a Worker URL (`wss://...workers.dev`) directly inside **Multiplayer Hub → Rooms → Cloudflare Server** or pass `?server=wss://...` in the URL.
