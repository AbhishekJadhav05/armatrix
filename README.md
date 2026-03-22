# Armatrix — Team Page

A production-ready Team Page for Armatrix, a deep-tech snake-arm robotics startup.

## Live

| | URL |
|---|---|
| Frontend (Vercel) | https://armatrix-peach.vercel.app |
| Backend API (Render) | https://armatrix-backend-8z0q.onrender.com |

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Python 3.11, FastAPI, Pydantic v2, Uvicorn |
| Deployment | Vercel (frontend) + Render free tier (backend) |

## Project Structure

Next.js frontend lives at repo root (Vercel-friendly). FastAPI backend in `/backend`.

## Local Development

**Backend:**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

**Frontend:**

```bash
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
# http://localhost:3000/team
```

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | /api/health | Health check |
| GET | /api/team | All members (founders first) |
| GET | /api/team/{id} | Single member |
| POST | /api/team | Create member |
| PATCH | /api/team/{id} | Update member |
| DELETE | /api/team/{id} | Delete member |
| GET | /api/team/department/{dept} | Filter by department |

## Design Decisions

- **Single accent color** — electric chartreuse `#E8FF47` on near-black. Used sparingly as structural highlights, not decoration.
- **Snake-arm visual language** — segmented connector lines with a crawling glowing node run between page sections, echoing the arm's joint structure.
- **No border-radius anywhere** — sharp corners throughout. Intentional and consistent with Armatrix's industrial identity.
- **Placeholder avatars** — `robohash.org` set 4 (cat doodles) as default photos. Intentional, not broken — swap with real headshots when available.
- **Path aliases with `_` prefix** — avoids Node module namespace collisions. Import origin is unambiguous at a glance.
- **Max 200 lines / component** — every component has one clear responsibility.
- **In-memory storage** — appropriate for demo; swap with SQLite + SQLModel in one afternoon.
- **Render cold-start banner** — turns a 30s blank load into an expected, handled experience.

## Deployment

**Backend → Render:**
1. New Web Service → connect repo → root directory: `backend`
2. Build: `pip install -r requirements.txt`
3. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Env var: `ALLOWED_ORIGINS=https://armatrix-peach.vercel.app`

**Frontend → Vercel:**
1. Import repo root
2. Env var: `NEXT_PUBLIC_API_URL=https://armatrix-backend-8z0q.onrender.com`
3. Deploy — Vercel auto-detects Next.js
