import { test, expect } from '@playwright/test';
import { runFlow, testEmail } from './helpers/test-utils';

test.describe('Checkout Simulation – Vercel Commerce', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();
    await runFlow(page, 'Add the product to cart and wait for confirmation');
  });

  test('should proceed to checkout with valid information', async ({ page }) => {
    const email = testEmail('checkout');

    await runFlow(
      page,
      [
        'Open the cart and click "Checkout" or "Proceed to Checkout"',
        'Wait for the checkout page to load',
        `Fill in the email field with ${email}`,
        'Fill in shipping address: Name: Test User, Address: 123 Main St, City: New York, Zip: 10001',
        'Select a shipping method if options are available',
        'Continue to payment step',
        'Verify the order summary is displayed with correct items and total',
      ],
      { assertion: 'Checkout flow accepts valid shipping information and proceeds to payment' }
    );
  });

  test('should validate required fields in checkout', async ({ page }) => {
    await runFlow(
      page,
      [
        'Open the cart and go to checkout',
        'Click "Continue" or "Next" without filling required fields',
        'Verify validation errors appear for email, address, and other required fields',
        'Confirm the user cannot proceed until errors are resolved',
      ],
      { assertion: 'Checkout form validates required fields and shows error messages' }
    );
  });

  test('should simulate order confirmation flow', async ({ page }) => {
    const email = testEmail('order');

    await runFlow(
      page,
      [
        'Go to checkout',
        `Enter email: ${email}`,
        'Fill shipping address with valid data',
        'Accept terms and conditions if present',
        'Click "Place Order" or equivalent button',
        'Verify an order confirmation page or message is displayed',
        'Confirm the confirmation includes an order number or reference',
      ],
      { assertion: 'Order can be placed and a confirmation page is shown with order details' }
    );
  });
});
