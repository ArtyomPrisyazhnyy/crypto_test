import { test, expect } from '@playwright/test';

test('Top coins info is displayed', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const topCoinsInfo = await page.waitForSelector('.topRankedCoinsInfo');
    expect(topCoinsInfo).toBeTruthy();

    const topRankedCoins = await page.$$('.topRankedCoin');
    expect(topRankedCoins.length).toBeGreaterThan(0);
    for (const coin of topRankedCoins) {
        const coinName = await coin.textContent();
        expect(coinName).toBeTruthy();
    }
});
