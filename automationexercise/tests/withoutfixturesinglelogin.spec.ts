import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import { DataProvider } from "../utils/DataProvider";
import dotenv from "dotenv";

dotenv.config();

const jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");

let page: Page;
let homePage: HomePage;
let loginPage: LoginPage;

test.describe.serial("single login for all tests without fixtures", () => {
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await page.goto(process.env.URL!);
    await homePage.clickOnSignUpLogin();
    await loginPage.loginToApplication(
      jsonData.ValidUser.email,
      jsonData.ValidUser.password
    );
    await homePage.verifyLoggedInUser(jsonData.ValidUser.name);
  });

  test("click contact us from home page", async () => {
    await homePage.clickOnContactUs();
    await expect(page).toHaveURL(/contact_us$/);
  });

  test("click home from contact us page", async () => {
    await expect(page).toHaveURL(/contact_us$/);
    await homePage.clickOnHome();
    await expect(page).toHaveURL(process.env.URL!);
  });

  test.afterAll(async () => {
    await page.close();
  });
});
