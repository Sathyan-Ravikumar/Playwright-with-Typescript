import { test as base, Page } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";

type Fixtures = {
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await page.goto(process.env.URL!);
    await use(new HomePage(page));
  },

});

export { expect } from "@playwright/test";
