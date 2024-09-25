const { expect } = require('@playwright/test');

class landingPage {
    constructor(page) {   
        this.page = page;
        this.username = page.locator("//input[@id='name']");
        this.submitBtn = page.locator("//button[normalize-space()='Submit Form']");
        this.nameDialog = page.locator("//p[contains(normalize-space(), 'Welcome to MMS,')]");
    }

    async goTo() {
        
        // Navigate to the application
        await this.page.goto("http://localhost:4200/", { waitUntil: 'load' });
    }

    async validateSubmitButtonISActiveAfterUserNameInPut(username) {
      
        // Fill in the username
        await this.username.fill(username);
        // Check if the submit button is enabled after entering the username
        await expect(this.submitBtn).toBeEnabled();
    }

    async validateNameDialog() {

        // Optional: Validate the welcome message dialog
        await expect(this.nameDialog).toBeVisible();
    }

    async isSubmitButtonPresent(username) {

        // check button is available but disabled 
        await expect(this.submitBtn).toBeDisabled();
        await this.username.fill(username);
        const isVisible = await this.submitBtn.isVisible();
        expect(isVisible).toBe(true);
    }

    async isDialogPresentAfterClickingSumbit(username) {

        await this.username.fill(username);
        await this.submitBtn.click();
        await this.nameDialog.textContent();
       
    }

    async validateDialigMessageIsCorrect(username) {

        let dialogtext = "Welcome to MMS, SimzTest";

        await this.username.fill(username);
        await this.submitBtn.click();
        const dialogText = await this.nameDialog.textContent();
        await expect(dialogText.trim()).toBe(dialogtext);
    }
}

module.exports = { landingPage };