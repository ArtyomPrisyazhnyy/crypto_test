import { test, expect } from '@playwright/test';

test('Pagination works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const pagination = await page.waitForSelector('.pagination');
    expect(pagination).toBeTruthy();

    const isPrevButtonDisabled = await page.$eval('.pagination__btn:has-text("Prev")', (el) =>
        el.hasAttribute('disabled'),
    );
    expect(isPrevButtonDisabled).toBeTruthy();

    const isNextButtonDisabled = await page.$eval('.pagination__btn:has-text("Next")', (el) =>
        el.hasAttribute('disabled'),
    );
    expect(isNextButtonDisabled).toBeFalsy();

    await page.click('.pagination__btn:has-text("Next")');

    await page.waitForTimeout(1000);

    const isPrevButtonEnabled = await page.$eval('.pagination__btn:has-text("Prev")', (el) =>
        el.hasAttribute('disabled'),
    );
    expect(isPrevButtonEnabled).toBeFalsy();
});
