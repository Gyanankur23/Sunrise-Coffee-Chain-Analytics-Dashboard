import { test, expect } from '@playwright/test';

const pages = [
  { name: 'executive-overview', path: '/' },
  { name: 'store-performance', path: '/store-performance' },
  { name: 'loyalty-analytics', path: '/loyalty-analytics' },
  { name: 'revenue-mix', path: '/revenue-mix' },
  { name: 'seasonal-patterns', path: '/seasonal-patterns' },
  { name: 'advanced-analytics', path: '/advanced-analytics' },
];

test.describe('Dashboard Screenshots', () => {
  test.beforeAll(async () => {
    // Wait a bit for server to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  pages.forEach((page) => {
    test(`screenshot ${page.name}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
      });
      const pageInstance = await context.newPage();
      
      await pageInstance.goto(`http://localhost:5174${page.path}`);
      
      // Wait for data to load
      await pageInstance.waitForSelector('[class*="card"]', { timeout: 10000 });
      await pageInstance.waitForTimeout(2000);
      
      // Take full page screenshot
      await pageInstance.screenshot({
        path: `screenshots/${page.name}.png`,
        fullPage: true,
      });
      
      await context.close();
    });
  });
});
