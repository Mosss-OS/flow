import { test, expect } from '@playwright/test';
import { runFlow, assertWithConsensus } from './helpers/test-utils';

test.describe('Responsive & Auto-Healing – Vercel Commerce', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 851 });

    await page.goto('/');

    await runFlow(
      page,
      [
        'Verify the mobile header and menu are visible',
        'Check that the product grid adapts to a single column or fewer columns',
        'Confirm text and images are readable without horizontal scrolling',
        'Tap the mobile menu icon and verify navigation links appear',
      ],
      { assertion: 'Site is fully responsive and usable on mobile viewport' }
    );
  });

  test('should auto-heal when selectors change (simulated)', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Wait for the page to load completely',
        'Locate the search button in the header (even if the underlying selector has changed)',
        'Click the search button to open the search input',
        'Type "hoodie" and confirm search results appear',
      ],
      { assertion: 'Auto-healing successfully finds the search button despite selector changes' }
    );
  });

  test('should maintain cart state across responsive breakpoints', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();
    await runFlow(page, 'Add the product to cart and wait for confirmation');

    await runFlow(
      page,
      [
        'Switch viewport to mobile size (393x851)',
        'Wait for layout to adapt',
        'Open the cart and verify the item is still present',
        'Check that the cart UI is usable on mobile',
      ],
      { assertion: 'Cart contents persist and remain accessible when switching to mobile view' }
    );
  });

  test('multi-model assertion: product page quality', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    await assertWithConsensus(
      page,
      'Verify this product page has a clear title, price, add-to-cart button, and at least one product image. The page should look professional and be easy to navigate.'
    );
  });
});
