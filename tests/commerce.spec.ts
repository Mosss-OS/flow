import { test, expect } from '@playwright/test';
import { Passmark } from 'passmark-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const passmark = new Passmark({
  headless: process.env.HEADLESS !== 'false',
  anthropic: { apiKey: process.env.ANTHROPIC_API_KEY! },
  google: { apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY! },
  autoHeal: true,
  ...(process.env.REDIS_URL && { redis: { url: process.env.REDIS_URL } }),
});

test('browse products', async ({ page }) => {
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Verify product grid is visible',
    'Click first product',
    'Check product detail page loads with title and price',
  ], { assertion: 'Product page displays correctly' });
});

test('search and filter', async ({ page }) => {
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Search for "hoodie"',
    'Verify search results show hoodie products',
    'Apply a category filter',
    'Confirm filtered results are relevant',
  ], { assertion: 'Search and filter work correctly' });
});

test('add to cart and checkout', async ({ page }) => {
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Click first product',
    'Select variant if available',
    'Add to cart',
    'Verify cart badge updates',
    'Open cart and proceed to checkout',
  ], { assertion: 'Item added to cart and checkout accessible' });
});

test('responsive and auto-heal', async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 851 });
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Verify mobile menu is visible',
    'Check product grid adapts to mobile',
    'Navigate and confirm layout remains usable',
  ], { assertion: 'Site is responsive and auto-healing works' });
});
