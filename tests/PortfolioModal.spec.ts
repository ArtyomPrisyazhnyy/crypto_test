import { test, expect } from '@playwright/test';

test('Modal is displayed and close button works', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const modal = await page.$('.modal');
    expect(modal).toBeFalsy();

    await page.click('.portfolio');

    await page.waitForSelector('.modal');

    const closeButton = await page.$('.close-button');
    expect(closeButton).toBeTruthy();

    await closeButton?.click();

    await page.waitForSelector('.modal', { state: 'hidden' });
});
