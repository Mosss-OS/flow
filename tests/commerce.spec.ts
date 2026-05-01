import { test, expect } from '@playwright/test';
import { runUserFlow, configure } from 'passmark';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

configure({
  ai: {
    gateway: 'openrouter',
  },
});

test('browse products', async ({ page }) => {
  test.setTimeout(60_000);
  await runUserFlow({
    page,
    userFlow: 'Browse products and verify detail page',
    steps: [
      { description: 'Navigate to https://demo.vercel.store' },
      { description: 'Verify product grid is visible with at least 4 products' },
      { description: 'Click first product card' },
      { description: 'Check product detail page loads with title, price, and add to cart button' },
    ],
    assertions: [{ assertion: 'Product page displays correctly with all key elements' }],
    test,
    expect,
  });
});

test('search and filter', async ({ page }) => {
  test.setTimeout(60_000);
  await runUserFlow({
    page,
    userFlow: 'Search for hoodie and apply filters',
    steps: [
      { description: 'Navigate to https://demo.vercel.store' },
      { description: 'Search for "hoodie" using the search bar' },
      { description: 'Verify search results show hoodie products with images and prices' },
      { description: 'Apply a category filter if available' },
      { description: 'Confirm filtered results are relevant to the search term' },
    ],
    assertions: [{ assertion: 'Search and filter work correctly and show relevant results' }],
    test,
    expect,
  });
});

test('add to cart and checkout', async ({ page }) => {
  test.setTimeout(60_000);
  await runUserFlow({
    page,
    userFlow: 'Add item to cart and verify cart updates',
    steps: [
      { description: 'Navigate to https://demo.vercel.store' },
      { description: 'Click first product card to open detail page' },
      { description: 'Select size or variant if available' },
      { description: 'Click Add to Cart button' },
      { description: 'Wait for cart confirmation' },
      { description: 'Verify cart badge updates with item count' },
      { description: 'Open cart and verify item is present' },
    ],
    assertions: [{ assertion: 'Item successfully added to cart and cart UI reflects the change' }],
    test,
    expect,
  });
});

test('responsive and auto-heal', async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 393, height: 851 });
  await runUserFlow({
    page,
    userFlow: 'Verify mobile responsive layout and auto-healing',
    steps: [
      { description: 'Navigate to https://demo.vercel.store' },
      { description: 'Verify mobile menu icon is visible' },
      { description: 'Check product grid adapts to mobile layout' },
      { description: 'Tap mobile menu and verify navigation links appear' },
      { description: 'Navigate to a product and confirm layout remains usable' },
    ],
    assertions: [{ assertion: 'Site is responsive and auto-healing works on mobile viewport' }],
    test,
    expect,
  });
});
