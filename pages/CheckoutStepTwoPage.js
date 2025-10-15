// CheckoutStepTwoPage.js
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
    constructor(page) {
        super(page);
        this.finishButton = this.page.locator('[data-test="finish"]');
        this.summaryInfo = this.page.locator('.summary_info');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async isSummaryVisible() {
        return this.summaryInfo.isVisible();
    }
}
