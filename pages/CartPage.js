// CartPage.js
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
    }

    async getNumberOfItemsInCart() {
        return this.cartItems.count();
    }

    async isItemInCart(itemName) {
        const item = this.page.locator('.cart_item', { hasText: itemName });
        return item.isVisible();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}
