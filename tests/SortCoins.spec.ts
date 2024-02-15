import { parseFormattedNumber } from './../src/utils/parseFormattedNumber';
import { test, expect } from '@playwright/test';

test('Sort options are displayed and selectable', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const options = await page.waitForSelector('.options');
    expect(options).toBeTruthy();

    const sortOptions = await page.waitForSelector('.btn__list');
    expect(sortOptions).toBeTruthy();

    const sortByButtons = await page.$$('.btn__list__select');
    expect(sortByButtons.length).toBe(3);

    const selectedButton = await page.$('.btn__list__select');
    expect(selectedButton).not.toBeNull();
    expect(await selectedButton?.innerText()).toBe('Price');

    const priceElements = await page.$$('.td__price');

    const prices: number[] = await Promise.all(
        priceElements.map(async (element) => {
            const priceText = await element.innerText();
            return parseFormattedNumber(priceText.replace('$', '').replace(',', ''));
        }),
    );

    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }

    await page.click('li:has-text("Market Cap")');

    const marketCapButton = await page.$('.btn__list__selected');
    expect(await marketCapButton?.innerText()).toBe('Market Cap');

    const MarketCapElements = await page.$$('.td__marketCap');
    const MarketCaps: number[] = await Promise.all(
        MarketCapElements.map(async (element) => {
            const priceText = await element.innerText();
            return parseFormattedNumber(priceText.replace('$', '').replace(',', ''));
        }),
    );

    for (let i = 0; i < MarketCaps.length - 1; i++) {
        expect(MarketCaps[i]).toBeGreaterThanOrEqual(MarketCaps[i + 1]);
    }

    await page.click('li:has-text("Change (24Hr)")');

    const change24HrButton = await page.$('.btn__list__selected');
    expect(await change24HrButton?.innerText()).toBe('Change (24Hr)');

    const ChangeHrElements = await page.$$('.td__changes');
    const Changes: number[] = await Promise.all(
        ChangeHrElements.map(async (element) => {
            const priceText = await element.innerText();
            return Math.abs(parseFormattedNumber(priceText.replace('$', '').replace(',', '')));
        }),
    );

    for (let i = 0; i < Changes.length - 1; i++) {
        expect(Changes[i]).toBeGreaterThanOrEqual(Changes[i + 1]);
    }
});
