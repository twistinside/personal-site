import { defineConfig } from '@playwright/test';

const port = 4401;

export default defineConfig({
  testDir: './tests',
  reporter: 'list',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixels: 300,
    },
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    browserName: 'chromium',
    colorScheme: 'light',
    headless: true,
    viewport: {
      width: 1440,
      height: 900,
    },
  },
  webServer: {
    command: 'npm run build && npm run preview:test',
    port,
    reuseExistingServer: false,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120_000,
  },
});
