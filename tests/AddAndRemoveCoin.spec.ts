import { test, expect } from '@playwright/test';

test('Adding coin to portfolio and removing works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/about/bitcoin');

    const coinInfo = await page.waitForSelector('.coin_info');
    expect(coinInfo).toBeTruthy();

    const addToPortfolioButton = await page.waitForSelector('.add-button', { timeout: 5000 });
    expect(addToPortfolioButton).toBeTruthy();
    await addToPortfolioButton.click();

    const addModal = await page.waitForSelector('.modal');
    expect(addModal).toBeTruthy();

    await page.fill('.coin__count__input', '2');

    const addButton = await page.waitForSelector('.add-button:has-text("Add")', { timeout: 5000 });
    expect(addButton).toBeTruthy();
    await addButton.click();

    await page.waitForTimeout(1000);

    const closeButton = await page.$('.close-button');
    expect(closeButton).toBeTruthy();

    await closeButton?.click();

    await page.waitForSelector('.modal', { state: 'hidden' });

    const modal = await page.$('.modal');
    expect(modal).toBeFalsy();

    await page.click('.portfolio');

    await page.waitForSelector('.modal');

    const removeButton = await page.waitForSelector('.remove-button');
    expect(removeButton).toBeTruthy();
    await removeButton.click();

    await page.waitForTimeout(2000);
    const closePortfolio = await page.$('.close-button');
    expect(closePortfolio).toBeTruthy();
    await closePortfolio?.click();

    await page.waitForSelector('.modal', { state: 'hidden' });

    const portfolioMessage = await page.textContent('.portfolio');
    expect(portfolioMessage).toContain('Portfolio is empty');
});
