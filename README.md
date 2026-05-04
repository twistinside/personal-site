# Twistinside

[![Deploy Site](https://github.com/twistinside/personal-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/twistinside/personal-site/actions/workflows/deploy.yml)

Twistinside is a static personal writing site built with Astro. It publishes articles, an archive, and a short about page while keeping the implementation small, fast, and easy to maintain.

## Requirements
- Node.js 22.x or newer.
- npm.

## Features
- Built with [Astro](https://astro.build) for static-first performance.
- MDX article content under `src/content/articles/`.
- Self-hosted fonts and static assets from `public/`.
- Playwright screenshot coverage for key pages.

## Getting Started
1. Install dependencies: `npm install`
2. Start the local dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview the production build locally: `npm run preview`

## Testing
This project currently uses two layers of checks:

- `npm run build`: verifies the Astro site compiles and prerenders successfully.
- `npm run test:screenshots`: builds the site, serves the production output locally, and compares Playwright screenshots against the committed baselines.

Screenshot coverage currently includes:

- `/`
- `/about`
- `/archive`
- `/articles/seeded-random-part-1`

If you intentionally change the visual output of one of those pages, update the baselines with:

```bash
npm run test:screenshots:update
```

Adding or changing articles can also affect the `/` and `/archive` snapshots because those pages render article metadata and recent article content.

For a normal local verification pass before opening a PR, run:

```bash
npm run build
npm run test:screenshots
```

The PR workflow also runs the screenshot suite on GitHub Actions, so a visual regression will fail the pull request checks until the baselines are updated and committed.

## Project Structure
Key folders you’ll interact with:
- `src/pages/`: Individual pages, including the homepage.
- `src/layouts/`: Shared page layouts and wrappers.
- `src/components/`: Shared Astro components.
- `src/styles/`: Global, article, and code block CSS bundled by Astro.
- `src/content/articles/`: Article content written in MDX.
- `public/`: Static assets that are served as-is.
- `tests/`: Playwright screenshot tests and snapshot baselines.

## Deployment
The site is automatically built and deployed via GitHub Actions (see the badge above). Pull requests to `mainline` run the build and screenshot suites. Pushes to `mainline` build the site and upload `dist/` to Porkbun via FTP.
