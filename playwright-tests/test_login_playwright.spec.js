const { chromium } = require('playwright');

async function test_login_playwright() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    const isVisible = await page.locator("text=Products").isVisible();
    if (!isVisible) throw new Error("Products text not visible");
    await browser.close();
}

test_login_playwright();
