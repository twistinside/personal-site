# My Website

[![Deploy Site](https://github.com/twistinside/personal-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/twistinside/personal-site/actions/workflows/deploy.yml)

A simple Astro-powered personal website that highlights projects, shares a bit about me, and links out to the places I’m active online. The goal is to keep the experience fast, accessible, and easy to maintain.

## Features
- Built with [Astro](https://astro.build) for static-first performance.
- Minimal styling focused on readability and quick loading.
- Easily extendable content structure for adding new pages or sections.

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
- `public/`: Static assets that are served as-is.
- `tests/`: Playwright screenshot tests and snapshot baselines.

## Deployment
The site is automatically built and deployed via GitHub Actions (see the badge above). Push changes to the default branch to trigger a fresh build and deploy.
