const { chromium } = require('playwright');

async function test_checkout_playwright() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await page.click("#add-to-cart-sauce-labs-backpack");
    await page.click(".shopping_cart_link");
    await page.click("#checkout");

    const isVisible = await page.locator("text=Checkout: Your Information").isVisible();
    if (!isVisible) throw new Error("Checkout page not visible");
    await browser.close();
}

test_checkout_playwright();
