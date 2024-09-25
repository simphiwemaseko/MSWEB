const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',

timeout: 30 * 1000,
expect : {
  timeout: 5000
},
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screen: 'on',
    trace : 'on'

  },

};

module.exports = config;