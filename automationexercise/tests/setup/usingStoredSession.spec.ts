import { test, expect } from "../../fixtures/homepageFixture";
import { HomePage } from "../../Pages/HomePage";
import dotenv from "dotenv";

dotenv.config();


test.describe("single login using storage state", () => {

  test("click contact us from home page @session", async ({homePage,page}) => {
    await homePage.clickOnContactUs();
    await expect(page).toHaveURL(/contact_us$/);
  });

  test("click home from contact us page @session", async ({homePage,page}) => {
    await homePage.clickOnContactUs();
    await expect(page).toHaveURL(/contact_us$/);
    await homePage.clickOnHome();
    await expect(page).toHaveURL(process.env.URL!);
  });
});
