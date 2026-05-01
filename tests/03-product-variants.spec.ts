import { test, expect } from '@playwright/test';
import { runFlow } from './helpers/test-utils';

test.describe('Product Variants – Vercel Commerce', () => {
  test('should select size variant and update price', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    await runFlow(
      page,
      [
        'If size options are available, select a size (e.g., "M" or "L")',
        'Verify the selected size is visually highlighted',
        'Check that the price updates if variant pricing differs',
        'Confirm the "Add to Cart" button remains enabled',
      ],
      { assertion: 'Size variant selection works and the UI reflects the chosen size' }
    );
  });

  test('should select color variant and update product image', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    await runFlow(
      page,
      [
        'If color swatches are available, click on a different color',
        'Wait for the product image to update to reflect the new color',
        'Verify the selected color swatch is marked as active',
        'Confirm the variant SKU or title updates if applicable',
      ],
      { assertion: 'Color variant changes the product image and highlights the selected color' }
    );
  });

  test('should handle out-of-stock variant gracefully', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Navigate to a product with multiple variants',
        'Attempt to select a combination that is out of stock (if visible)',
        'Verify an "Out of Stock" message or disabled state is shown',
        'Confirm the "Add to Cart" button is disabled for that variant',
      ],
      { assertion: 'Out-of-stock variants are clearly indicated and cannot be added to cart' }
    );
  });
});
