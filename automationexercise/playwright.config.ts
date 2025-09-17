import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // at least 1 retry locally too
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", { open: "never" }],
    ["list"], // quick feedback in console
  ],

  use: {
    baseURL: "https://automationexercise.com",
    headless: process.env.CI ? true : false, // run headed locally, headless in CI
    trace: "retain-on-failure", // easier debugging
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    testIdAttribute: "data-qa",
    actionTimeout: 10 * 1000,
    navigationTimeout: 20 * 1000,
    viewport: { width: 1366, height: 768 }, // stable window size
    launchOptions: {
      slowMo: process.env.DEBUG ? 300 : 0, // smoother steps in debug
    },
  },

  expect: {
    timeout: 5000, // global default for expect assertions
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // enable other browsers only if needed
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
});
