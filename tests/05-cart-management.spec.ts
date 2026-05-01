import { test, expect } from '@playwright/test';
import { runFlow } from './helpers/test-utils';

test.describe('Cart Management – Vercel Commerce', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();
    await runFlow(page, 'Add the product to cart and wait for confirmation');
  });

  test('should update item quantity in cart', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart slide-out or cart page',
        'Locate the quantity controls for the added item',
        'Increase the quantity to 3',
        'Wait for the cart total to update',
        'Verify the quantity displays 3 and the line total is correct',
      ],
      { assertion: 'Cart quantity can be increased and the cart total updates correctly' }
    );
  });

  test('should remove item from cart', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart',
        'Locate and click the remove/delete button for the item',
        'Confirm the item is removed from the cart',
        'Verify the cart is now empty or shows a correct item count of 0',
      ],
      { assertion: 'Item can be removed from cart and the cart updates to reflect removal' }
    );
  });

  test('should display correct cart total with taxes', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart',
        'Verify the subtotal is displayed',
        'Check that taxes or estimated taxes are shown if applicable',
        'Confirm the order total reflects subtotal + taxes',
      ],
      { assertion: 'Cart displays correct subtotal, taxes, and order total' }
    );
  });
});
