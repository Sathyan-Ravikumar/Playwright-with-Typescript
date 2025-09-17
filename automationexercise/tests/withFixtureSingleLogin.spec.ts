import { test, expect } from "../fixtures/loginFixture";
import { DataProvider } from "../utils/DataProvider";
import dotenv from "dotenv";

dotenv.config();
const jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");

let page: any;
let homePage: any;

test.describe.serial("single login for all tests using fixture with parameters", () => {

  test.use({
    loginOptions: {
      email: jsonData.ValidUser.email,
      password: jsonData.ValidUser.password,
      name: jsonData.ValidUser.name,
    },
  });

  test.beforeAll(async ({ loggedInPage, homePage:home }) => {
    page = loggedInPage;
    homePage = home;
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
});
