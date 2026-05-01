import { test, expect } from '@playwright/test';
import { runFlow } from './helpers/test-utils';

test.describe('Promo Codes & Edge Cases – Vercel Commerce', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();
    await runFlow(page, 'Add the product to cart and wait for confirmation');
  });

  test('should apply a valid promo code', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart',
        'Locate the promo code or discount code input field',
        'Enter a valid promo code (e.g., "SAVE10" or "WELCOME") if one is known',
        'Click "Apply" or equivalent button',
        'Verify the discount is applied and the cart total is reduced',
        'Confirm the discount line item appears in the order summary',
      ],
      { assertion: 'Valid promo code reduces the cart total and shows discount in summary' }
    );
  });

  test('should reject invalid promo code with error', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart',
        'Enter an invalid promo code: "INVALIDCODE123"',
        'Click "Apply"',
        'Verify an error message appears indicating the code is invalid or expired',
        'Confirm the cart total does not change',
      ],
      { assertion: 'Invalid promo code shows an error and does not affect cart total' }
    );
  });

  test('should handle expired or usage-limit promo codes', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart',
        'Enter a promo code that appears expired or has reached usage limit',
        'Attempt to apply the code',
        'Verify a specific error message about expiration or limit is shown',
      ],
      { assertion: 'Expired or limited promo codes display appropriate error messages' }
    );
  });

  test('should prevent checkout with empty cart', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart and remove all items so the cart is empty',
        'Try to navigate to checkout or find the checkout button',
        'Verify checkout is not possible (button disabled or redirect back)',
        'Confirm a message encourages the user to add items',
      ],
      { assertion: 'Empty cart prevents checkout and displays an appropriate message' }
    );
  });
});
