# Tattoo Kaohsiung

Premium tattoo studio web app for Kaohsiung. Chic dark aesthetic with Old Gold accents.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

```bash
npm install
cp .env.local.example .env.local  # Add your Supabase credentials
npm run dev
```

## Database Setup

Run the migration in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor to create:

- **artists** – Artist profiles (bio, specialty, IG handle)
- **art_uploads** – Portfolio pieces with tags
- **blog_posts** – Markdown/CMS-lite blog
- **ig_feed** – Curated Instagram links

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for the full folder layout.

## Deployment

Target: e2-standard-2 (Debian/Ubuntu) via Docker or PM2.
