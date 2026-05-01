import { test, expect } from '@playwright/test';
import { Passmark, configure } from 'passmark';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

configure({
  ai: {
    gateway: 'openrouter',
  },
});

const passmark = new Passmark({
  headless: process.env.HEADLESS !== 'false',
  autoHeal: true,
});

test('browse products', async ({ page }) => {
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Verify product grid is visible with at least 4 products',
    'Click first product card',
    'Check product detail page loads with title, price, and add to cart button',
  ], { assertion: 'Product page displays correctly with all key elements' });
});

test('search and filter', async ({ page }) => {
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Search for "hoodie" using the search bar',
    'Verify search results show hoodie products with images and prices',
    'Apply a category filter if available',
    'Confirm filtered results are relevant to the search term',
  ], { assertion: 'Search and filter work correctly and show relevant results' });
});

test('add to cart and checkout', async ({ page }) => {
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Click first product card to open detail page',
    'Select size or variant if available',
    'Click Add to Cart button',
    'Wait for cart confirmation',
    'Verify cart badge updates with item count',
    'Open cart and verify item is present',
  ], { assertion: 'Item successfully added to cart and cart UI reflects the change' });
});

test('responsive and auto-heal', async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 851 });
  await page.goto('/');
  await passmark.runUserFlow(page, [
    'Verify mobile menu icon is visible',
    'Check product grid adapts to mobile layout',
    'Tap mobile menu and verify navigation links appear',
    'Navigate to a product and confirm layout remains usable',
  ], { assertion: 'Site is responsive and auto-healing works on mobile viewport' });
});
