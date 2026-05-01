import { test, expect } from '@playwright/test';
import { runFlow } from './helpers/test-utils';

test.describe('Search & Filter – Vercel Commerce', () => {
  test('should search for a product by name', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Locate the search input field in the header',
        'Type "t-shirt" into the search field and submit',
        'Wait for search results to load',
        'Verify the results page shows products related to "t-shirt"',
        'Confirm each result displays a product image, name, and price',
      ],
      { assertion: 'Search results show t-shirt products with images and prices' }
    );
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Click on the "Shop" or "Collections" navigation link',
        'Select a category filter (e.g., "T-Shirts" or "Accessories")',
        'Wait for the product grid to update',
        'Verify all displayed products belong to the selected category',
        'Check that the active filter is visually indicated',
      ],
      { assertion: 'Products are filtered correctly and the active filter is highlighted' }
    );
  });

  test('should combine search and filter together', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Search for "hoodie" using the search bar',
        'After results load, apply a price filter (low to high)',
        'Verify the results are filtered by search term and sorted by price',
        'Confirm no products exceed the expected price range',
      ],
      { assertion: 'Search and filter work together: results match "hoodie" and are sorted by price' }
    );
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    await page.goto('/');

    await runFlow(
      page,
      [
        'Search for a non-existent product: "xyznonexistent123"',
        'Wait for results to load',
        'Verify an empty state message is shown to the user',
        'Confirm there is a link or button to return to all products',
      ],
      { assertion: 'Empty search results display a helpful message and a way to return to products' }
    );
  });
});
