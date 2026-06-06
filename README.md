# Safari Camp Lodge — Booking System

Luxury safari lodge booking and management: public site, guest bookings, and admin dashboard. Built with **Next.js 16**, **Neon PostgreSQL**, **Drizzle ORM**, and **Better Auth**.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A [Neon](https://neon.tech) project with a connection string

## Quick start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment variables

Copy the example and fill in your Neon URL and auth secret:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon pooled Postgres URL (`?sslmode=require`) |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` for local dev |
| `SEED_ADMIN_PASSWORD` | Optional; default used by seed script |

### 3. Push database schema

```bash
pnpm db:push
```

If a previous partial schema exists on Neon (column name conflicts), reset first — **this deletes all data**:

```bash
pnpm db:reset && pnpm db:push
```

### 4. Seed data (admin + accommodations + inventory)

```bash
pnpm db:seed
```

This creates:

- **Admin**: `qinalexander56@gmail.com` (password from `SEED_ADMIN_PASSWORD` or default `SafariCampAdmin2026!`)
- **4 accommodations** (IDs `1`–`4`, matching the booking page)
- **120 days** of room inventory per accommodation
- **Sample activities**

### 5. Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Purpose |
|-------|---------|
| `/` | Public landing page |
| `/book` | Create a booking (sign in required) |
| `/bookings` | Your reservations |
| `/sign-in` / `/sign-up` | Auth |
| `/admin` | Admin dashboard (admin role only) |

## Site images

All image paths and creative briefs live in **`lib/images.ts`**. Drop files under **`public/images/`** (see `public/images/README.md`), then update the matching `src` in that file — no hunting through components.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm db:push` | Sync Drizzle schema to Neon |
| `pnpm db:seed` | Seed admin, rooms, activities |
| `pnpm db:studio` | Drizzle Studio (DB browser) |

## Project structure

```
app/              # Pages & server actions
lib/db/           # Drizzle schema + connection pool
lib/auth.ts       # Better Auth server
scripts/seed.ts   # Database seed
```

See [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) for feature phases and architecture notes.

## Security notes

- Never commit `.env.local` (gitignored).
- Rotate Neon credentials if they were shared in chat or tickets.
- Change the seeded admin password after first login.

## v0 / Vercel

This repo can be linked to [v0](https://v0.app). Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in your Vercel project environment variables, then run `pnpm db:push` and `pnpm db:seed` against production Neon from your machine or CI.
