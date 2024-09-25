const {test,expect, request} = require('@playwright/test');
const { exec } = require('child_process');
const {landingPage} = require('../pageobjects/landingpage.js');
const path = require('path');
const payload ={
    "location": {
      "lat": -38.383494,
      "lng": 33.427362
    },
    "accuracy": 51,
    "name": "Frontline house",
    "phone_number": "(+91) 983 893 3937",
    "address": "29, side layout, cohen 09",
    "types": [
      "shoe park",
      "shop"
    ],
    "website": "http://google.com",
    "language": "French-IN"
  };

let ngServeProcess;
let username = "SimzTest"

test.beforeAll(async () => {

    const cwd = path.join(process.cwd(), 'MSWEB'); 
       // Start ng serve using npx
      ngServeProcess = exec('npx ng serve', { cwd });

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

test('Basic API Test', async () => {
    const url = "https://rahulshettyacademy.com/maps/api/place/add/json?key=qaclick123";
    const apiContext = await request.newContext();
    
    const response = await apiContext.post(url, {
        data: payload
    });

    // Assert that the response is OK (status code 200-299)
    expect(response.ok()).toBeTruthy(); // Checks if the response is successful
});


test.afterAll(async () => {
    // Kill the ng serve process after tests complete
    if (ngServeProcess) {
        ngServeProcess.kill();
    }
});

