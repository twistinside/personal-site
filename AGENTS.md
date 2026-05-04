# AGENTS.md

## Project Overview
- Static personal writing site built with Astro 6.
- Package manager: `npm`.
- Node runtime target: 22.x or newer.
- Main branch: `mainline`.

## Repo Structure
- `src/pages/`: route files.
- `src/layouts/`: shared page layout.
- `src/components/`: reusable Astro components.
- `src/content/articles/`: article content in `.mdx`.
- `public/`: static assets, including self-hosted fonts and images.
- `tests/`: Playwright screenshot specs and committed snapshot baselines.

## Standard Commands
- Install deps: `npm install`
- Local dev server: `npm run dev`
- Production build: `npm run build`
- Preview production output: `npm run preview`
- Screenshot tests: `npm run test:screenshots`
- Update screenshot baselines: `npm run test:screenshots:update`

## Testing Expectations
- Always run `npm run build` after meaningful code changes.
- If a change affects visual output on tracked pages, run `npm run test:screenshots`.
- If the visual change is intentional, update baselines with `npm run test:screenshots:update` and commit the changed snapshot files.
- Adding or changing article content can affect the `/` and `/archive` snapshots even when the article route itself is not directly covered.

## Screenshot Test Notes
- Current screenshot coverage includes:
  - `/`
  - `/about`
  - `/archive`
  - `/articles/seeded-random-part-1`
- Snapshot files are committed under `tests/site-screenshots.spec.ts-snapshots/`.
- Current baselines are macOS-specific (`-darwin`), and PR CI runs screenshots on `macos-latest` to keep rendering consistent.

## CI / Deployment
- PR workflow runs:
  - build on Ubuntu
  - screenshot tests on macOS
- Pushes to `mainline` trigger deployment.
- Deployment uploads the built `dist/` output to Porkbun via FTP.

## Editing Guidance
- Prefer minimal, targeted changes.
- Preserve the existing visual style unless the task explicitly asks for redesign.
- This repo self-hosts fonts in `public/fonts`; avoid introducing external font dependencies unless requested.
- Keep `package-lock.json` in sync with `package.json`.
- If adding or changing screenshot-covered routes, update the Playwright spec, baselines, and README as part of the same change.
