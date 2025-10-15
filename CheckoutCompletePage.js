// CheckoutCompletePage.js
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);
        this.completeHeader = this.page.locator('.complete-header');
    }

    async isOrderComplete() {
        return this.completeHeader.isVisible();
    }
}
