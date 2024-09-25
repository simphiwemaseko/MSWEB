const {test,expect} = require('@playwright/test');
const { exec } = require('child_process');
const {landingPage} = require('../pageobjects/landingpage.js');

let ngServeProcess;
let username = "SimzTest"

test.beforeAll(async () => {
    // Start ng serve
    ngServeProcess = exec('ng serve', { cwd:'C:\\workspace\\MSWeb'});

    // Allow some time for the app to start
    await new Promise(resolve => setTimeout(resolve, 5000));
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

