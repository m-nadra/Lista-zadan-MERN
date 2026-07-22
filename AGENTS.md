# AGENTS.md

## Project overview

MERN task manager: React + Vite frontend (`client/`), Express backend (`server/`), MongoDB + Redis. Docker Compose for local dev and prod.

## Key commands

```bash
# Lint / format (run from repo root, Biome only — no ESLint)
npm run check    # biome check --write
npm run lint     # biome lint --write
npm run format   # biome format --write

# Client tests (in client/)
npm test         # vitest (jsdom, globals enabled)

# Local dev (Docker)
docker compose --profile dev up --watch
```

There is **no TypeScript** in this repo. Do not add TS config or type-check commands.

## Pre-commit checks

`scripts/pre-commit` runs `biome format` and `biome lint` on staged files. Before committing, ensure `npm run format` and `npm run lint` pass. CI runs `biome ci` on PRs to `main`.

## Architecture notes

- **server/server.js** — entrypoint. Express 5, Mongoose 9, Redis for sessions, JWT auth, Argon2id hashing.
- **client/vite.config.js** — `@` alias maps to `src/`. Dev proxy forwards `/api` to `server-dev:3000`.
- Auth uses HTTP-only cookies with JWT stored in Redis (15-min TTL).
- `compose.yaml` has separate `prod` and `dev` profiles. Dev profile uses `--watch` for hot reload.
- Client prod image is served via nginx. Production requires TLS certs in `certs/`.

## Code style

- Biome config: trailing commas off, arrow parens as-needed, 100-char line width.
- CSS Modules for styling.
- Both `client/` and `server/` use ES modules (`"type": "module"`).
- Biome checks only cover `client/` and `server/` directories (not root).

## Testing

- Client only: Vitest + Testing Library + jsdom. Tests live in `client/tests/`.
- No server-side tests exist.
- Run single test file: `npx vitest run tests/SomeTest.test.jsx` (from `client/`).

## Environment

Requires `.env` at root with `MONGO_USER`, `MONGO_PASSWORD`, `JWTPRIVATEKEY` (see `.env.example`).
