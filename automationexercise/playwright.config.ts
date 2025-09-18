import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // retry locally once too
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", { open: "never" }],
    ["list"], // quick feedback in console
  ],

  use: {
    baseURL: "https://automationexercise.com",
    headless: process.env.CI ? true : false, // headed locally, headless in CI
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    testIdAttribute: "data-qa",
    actionTimeout: 10 * 1000,
    navigationTimeout: 20 * 1000,
    viewport: { width: 1366, height: 768 },
    launchOptions: {
      slowMo: process.env.DEBUG ? 300 : 0,
    },
    // ❌ don’t set storageState here globally
    // it will be injected per project
  },

  expect: {
    timeout: 5000,
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: undefined, // start fresh for login
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/storage.json",
      },
      dependencies: ["setup"],
    },
    // you can add firefox/webkit later the same way
  ],
});
