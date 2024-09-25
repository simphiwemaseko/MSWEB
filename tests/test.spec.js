const {test,expect} = require('@playwright/test');
const { exec } = require('child_process');
const {landingPage} = require('../pageobjects/landingpage.js');
const path = require('path');

let ngServeProcess;
let username = "SimzTest"

test.beforeAll(async () => {
    
    const cwd = path.join(process.cwd(), 'MSWEB'); 
    // Start ng serve using npx
    ngServeProcess = exec('npx ng serve', { cwd });
});

test('Verify that the button is present on the landing page.', async ({ page }) => {

    const lp = new landingPage(page);
    await lp.goTo();
    await lp.isSubmitButtonPresent(username);
});

test('Submit button only available after entering name', async ({ page }) => {

    const lp = new landingPage(page);
    await lp.goTo();
    await lp.validateSubmitButtonISActiveAfterUserNameInPut(username);
});

test('Confirm that clicking the button triggers dialog Box', async ({ page }) => {

    const lp = new landingPage(page);
    await lp.goTo();
    await lp.isDialogPresentAfterClickingSumbit(username);
    
});

test('Validate that the displayed popup message is correct', async ({ page }) => {

    const lp = new landingPage(page);
    await lp.goTo();
    await lp.validateDialigMessageIsCorrect(username);
    
});

test.afterAll(async () => {
    // Kill the ng serve process after tests complete
    if (ngServeProcess) {
        ngServeProcess.kill();
    }
});

