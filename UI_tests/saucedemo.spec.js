// saucedemo.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { userData } from '../userData';

test.describe('SauceDemo UI Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutStepOnePage;
    let checkoutStepTwoPage;
    let checkoutCompletePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);
        await loginPage.navigate();
    });

    test('should allow standard user to login and complete a purchase', async ({ page }) => {
        // 1. Authentication
        await loginPage.login(userData.standardUser.username, userData.standardUser.password);
        await expect(page).toHaveURL(/inventory.html/);
        await expect(inventoryPage.isInventoryVisible()).toBeTruthy();

        // 2. Inventory management and Shopping cart functionality
        const itemToBuy = 'Sauce Labs Backpack';
        await inventoryPage.addItemToCart(itemToBuy);
        await expect(inventoryPage.getCartCount()).resolves.toBe(1);
        
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/cart.html/);
        await expect(cartPage.isItemInCart(itemToBuy)).toBeTruthy();

        // 3. Checkout process
        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one.html/);

        // Checkout Step One
        await checkoutStepOnePage.fillInformation(
            userData.checkoutInfo.firstName,
            userData.checkoutInfo.lastName,
            userData.checkoutInfo.zipCode
        );
        await expect(page).toHaveURL(/checkout-step-two.html/);

        // Checkout Step Two (Overview)
        await expect(checkoutStepTwoPage.isSummaryVisible()).toBeTruthy();
        await checkoutStepTwoPage.finishCheckout();
        await expect(page).toHaveURL(/checkout-complete.html/);

        // Checkout Complete
        await expect(checkoutCompletePage.isOrderComplete()).toBeTruthy();
        await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });

    test('should not allow locked out user to login', async ({ page }) => {
        await loginPage.login(userData.lockedOutUser.username, userData.lockedOutUser.password);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('should allow problem user to login', async ({ page }) => {
        await loginPage.login(userData.problemUser.username, userData.problemUser.password);
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should allow performance glitch user to login', async ({ page }) => {
        await loginPage.login(userData.performanceGlitchUser.username, userData.performanceGlitchUser.password);
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should allow error user to login', async ({ page }) => {
        await loginPage.login(userData.errorUser.username, userData.errorUser.password);
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should allow visual user to login', async ({ page }) => {
        await loginPage.login(userData.visualUser.username, userData.visualUser.password);
        await expect(page).toHaveURL(/inventory.html/);
    });
});
