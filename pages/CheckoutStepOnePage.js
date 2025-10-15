// CheckoutStepOnePage.js
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {
    constructor(page) {
        super(page);
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.zipCodeInput = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    async fillInformation(firstName, lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }
}
