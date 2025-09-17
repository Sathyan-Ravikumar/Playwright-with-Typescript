import { test, expect } from "../fixtures/loginFixture";
import { DataProvider } from "../utils/DataProvider";
import dotenv from "dotenv";

dotenv.config();

const jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");

test.describe.serial("single login for all tests with login fixture", () => {

    test.use({
    loginOptions: {
      email: jsonData.ValidUser.email,
      password: jsonData.ValidUser.password,
      name: jsonData.ValidUser.name,
    },
  });

  test("click contact us from home page", async ({ homePage, loggedInPage }) => {
    await homePage.clickOnContactUs();
    await expect(loggedInPage).toHaveURL(/contact_us$/);
  });

  test("click home from contact us page", async ({ homePage, loggedInPage }) => {
    await homePage.clickOnContactUs();
    await expect(loggedInPage).toHaveURL(/contact_us$/);
    await homePage.clickOnHome();
    await expect(loggedInPage).toHaveURL(process.env.URL!);
  });

});
