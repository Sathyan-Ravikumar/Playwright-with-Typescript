import { test, expect } from "@playwright/test";
import { HomePage } from "../../Pages/HomePage";
import { ContactUsPage } from "../../Pages/ContactUsPage";
import dotenv from "dotenv";
import { DataProvider } from "../../utils/DataProvider";

dotenv.config();
const jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");

let page: any;
let homePage: HomePage;
let contactus: ContactUsPage;

test.beforeEach(async ({ page: setupPage }) => {
  await setupPage.goto(process.env.URL!);
  page = setupPage;
  homePage = new HomePage(page);
  contactus = new ContactUsPage(page);
});

test("check the contact us fields @session", async () => {
  await homePage.clickOnContactUs();
  await expect(page).toHaveURL(/contact_us$/);
  await contactus.fillContactForm(
    jsonData.ValidUser.name,
    jsonData.ValidUser.email,
    "Test Subject",
    "This is a test message.",
    "testdata/contactus.txt"
  );

  await Promise.all([
    page.waitForEvent("dialog").then((dialog) => dialog.accept()),
    contactus.submitForm(),
  ]);
  await contactus.verifySuccessMessage(
    "Success! Your details have been submitted successfully."
  );

  await contactus.clickOnHomeButton();

  await expect(page).toHaveURL(process.env.URL!);
});
