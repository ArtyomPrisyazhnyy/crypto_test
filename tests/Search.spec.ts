import { test, expect } from '@playwright/test';

test('Search functionality works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const searchInput = await page.waitForSelector('.search__input');
    expect(searchInput).toBeTruthy();

    await searchInput.type('Bitcoin');
    await page.waitForTimeout(500);

    const inputValue = await searchInput.inputValue();
    expect(inputValue).toBe('Bitcoin');

    const coinListItems = await page.$$('.tr__link');
    expect(coinListItems.length).toBeGreaterThan(0);

    for (const item of coinListItems) {
        const coinName = await item.$eval('.coin-name', (el) => el.textContent);
        expect(coinName?.toLowerCase()).toContain('bitcoin');
    }
});
