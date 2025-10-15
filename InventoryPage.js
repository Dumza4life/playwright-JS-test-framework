// InventoryPage.js
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.inventoryList = this.page.locator('.inventory_list');
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
        this.shoppingCartLink = this.page.locator('.shopping_cart_link');
    }

    async isInventoryVisible() {
        return this.inventoryList.isVisible();
    }

    async addItemToCart(itemName) {
        const itemContainer = this.page.locator('.inventory_item', { hasText: itemName });
        await itemContainer.locator('button[data-test^="add-to-cart"]').click();
    }

    async getCartCount() {
        const count = await this.shoppingCartBadge.textContent();
        return count ? parseInt(count, 10) : 0;
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
}
