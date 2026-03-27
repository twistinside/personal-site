import { expect, test, type Page } from '@playwright/test';

const screenshotRoutes = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'about',
    path: '/about',
  },
  {
    name: 'archive',
    path: '/archive',
  },
  {
    name: 'article-seeded-random-part-1',
    path: '/articles/seeded-random-part-1',
  },
] as const;

async function loadPage(page: Page, path: string) {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

for (const route of screenshotRoutes) {
  test(`${route.name} screenshot`, async ({ page }) => {
    await loadPage(page, route.path);

    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      animations: 'disabled',
      fullPage: true,
      scale: 'css',
    });
  });
}
