# Multicity Tiffin Finder — Next.js 14

A plug-and-play, SEO-optimized directory for homestyle tiffin services across **Mumbai**, **Pune**, and **Bengaluru**.

## Features

- Multi-city routing: `/mumbai/listings`, `/pune/listings`, `/bengaluru/listings` plus dynamic pages for each listing, area, diet, and category.
- Static generation for listings pages and dynamic generation for detail, area, diet, category pages (serverless functions) with `force-dynamic`.
- Client-side search and filters (diet, rating, area) with instant results.
- JSON-LD structured data on detail pages for SEO.
- Sitemap and robots configured (remember to set your domain in `app/sitemap.js` and `app/robots.js`).
- TailwindCSS styling and modern UI.

## Quickstart

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy on Vercel

1. Push this folder to a new GitHub repository.
2. Import the repo in Vercel and deploy. Vercel auto-detects Next.js.
3. After deployment, edit `app/sitemap.js` and `app/robots.js` to set your domain (e.g., `https://multicity-tiffin-finder.vercel.app`). Commit and redeploy.
4. Replace the dataset files in `data/listings.*.raw.json` with updated Google Places exports when needed. The app auto-updates on build.

## Data Format

Each record should include at least the following fields:

- `title`: Name of the tiffin service.
- `totalScore`: Rating (0–5).
- `reviewsCount`: Number of reviews.
- `street`, `city`, `state`: Address components.
- `phone` (optional): Phone number (we normalize to E.164).
- `website` (optional): Website URL.
- `url`: Google Maps URL.
- `categoryName`: Category or cuisine description.

The data files for Mumbai, Pune, and Bengaluru are loaded from `/data` and mapped at runtime by `lib/data.js`. If fields are missing, the app handles defaults gracefully.