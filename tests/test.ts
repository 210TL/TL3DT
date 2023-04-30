import { expect, test } from '@playwright/test';

test('see the navbar', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('navigation')).toBeVisible();
});
