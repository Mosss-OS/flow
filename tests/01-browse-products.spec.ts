import { test, expect } from '@playwright/test';
import { runFlow, assertWithConsensus } from './helpers/test-utils';

test.describe('Browse Products – Vercel Commerce', () => {
  test('should load homepage and display product listings', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Wait for the page to fully load',
        'Verify the hero section is visible',
        'Scroll down to the product listing section',
        'Confirm at least 4 products are displayed with images and prices',
      ],
      { assertion: 'The homepage shows a hero banner and a grid of products with prices' }
    );

    // Traditional assertion as fallback
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
  });

  test('should navigate to a product detail page', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Click on the first product card in the grid',
        'Wait for the product detail page to load',
        'Verify the product title, price, and description are visible',
        'Check that an "Add to Cart" button is present',
      ],
      { assertion: 'Product detail page is loaded with title, price, and add-to-cart button' }
    );
  });

  test('should display product images with zoom capability', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    await runFlow(
      page,
      [
        'Verify the main product image is visible',
        'Check that image thumbnails are displayed below the main image',
        'Hover over the main image and confirm zoom behavior activates',
      ],
      { assertion: 'Product images are displayed with thumbnail navigation and zoom on hover' }
    );
  });
});
