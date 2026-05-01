import { test, expect } from '@playwright/test';
import { runFlow } from './helpers/test-utils';

test.describe('Add to Cart – Vercel Commerce', () => {
  test('should add a product to cart from detail page', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    await runFlow(
      page,
      [
        'Select a size or variant if options are available',
        'Click the "Add to Cart" button',
        'Wait for the cart notification or slide-out cart to appear',
        'Verify the product name and quantity (1) appear in the cart',
        'Confirm the cart icon badge updates to show 1 item',
      ],
      { assertion: 'Product is successfully added to cart and cart UI reflects the new item' }
    );
  });

  test('should add multiple products to cart', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Click on the first product to open its detail page',
        'Add the product to cart',
        'Wait for confirmation, then go back to the product listing',
        'Click on a second different product',
        'Add the second product to cart',
        'Open the cart and verify it contains 2 different items',
      ],
      { assertion: 'Multiple products can be added to cart and all items are displayed correctly' }
    );
  });

  test('should preserve cart contents on page refresh', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    await runFlow(
      page,
      [
        'Add the product to cart and wait for confirmation',
        'Reload the page',
        'Open the cart again',
        'Verify the previously added product is still in the cart',
      ],
      { assertion: 'Cart contents persist after page refresh (localStorage or session-based cart)' }
    );
  });
});
