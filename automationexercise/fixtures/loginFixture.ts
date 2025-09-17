import { test as base, Page } from "@playwright/test";
import LoginPage from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";

type LoginOptions = {
  email: string;
  password: string;
  name: string;
};

type Fixtures = {
  loggedInPage: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  loginOptions: LoginOptions;
};

export const test = base.extend<Fixtures>({
  loginOptions: {
    email: "",
    password: "",
    name: ""
  },

  loggedInPage: async ({ browser, loginOptions }, use) => {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto(process.env.URL!);
    await homePage.clickOnSignUpLogin();
    await loginPage.loginToApplication(
      loginOptions.email,
      loginOptions.password
    );
    await homePage.verifyLoggedInUser(loginOptions.name);

    await use(page);

  },

  loginPage: async ({ loggedInPage }, use) => {
    await use(new LoginPage(loggedInPage));
  },

  homePage: async ({ loggedInPage }, use) => {
    await use(new HomePage(loggedInPage));
  },
});

export { expect } from "@playwright/test";
