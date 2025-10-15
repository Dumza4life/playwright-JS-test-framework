// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['monocart-reporter', { name: 'Playwright Test Report', outputFile: './test-results/monocart-report.html' }]
  ],
  use: {
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'ui-chromium',
      testMatch: /saucedemo\.spec\.js/,
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com' }
    },
    {
      name: 'api-tests',
      testMatch: /booking\.spec\.js/,
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { 'Accept': 'application/json' }
      }
    }
  ]
});
	