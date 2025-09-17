import {test, expect} from '@playwright/test';
import ContactUsPage from '../Pages/ContactUsPage';
import { HomePage } from '../Pages/HomePage';
import dotenv from 'dotenv';
import { DataProvider } from "../utils/DataProvider";


let homePage: HomePage;
let contactUsPage: ContactUsPage;
let jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");
dotenv.config();

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  contactUsPage = new ContactUsPage(page);
  await page.goto(process.env.URL!);
});
test.afterEach(async ({ page }) => {
  await page.close(); 

});

test("Contact Us form submission", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  await homePage.clickOnContactUs();

  await contactUsPage.fillContactForm(
    jsonData.ValidUser.name,
    jsonData.ValidUser.email,
    "Test Subject",
    "This is a test message.",
    "testdata/contactus.txt"
  );

await Promise.all([
  page.waitForEvent('dialog').then(dialog => dialog.accept()), 
  contactUsPage.submitForm()
]);
  await contactUsPage.verifySuccessMessage("Success! Your details have been submitted successfully.");

  await contactUsPage.clickOnHomeButton();

  await expect(page).toHaveURL(process.env.URL!);
});