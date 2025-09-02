import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import { RandomDataUtil } from "../utils/RandomData";
import { DataProvider } from "../utils/DataProvider";
import dotenv from 'dotenv';

let homePage: HomePage;
let loginPage: LoginPage;
let registerPage: RegisterPage;
let jsonData = DataProvider.getTestDataFromJson("testdata/credentials.json");
dotenv.config();

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  registerPage = new RegisterPage(page);
  await page.goto(process.env.URL!);
});

test.afterEach(async ({ page }) => {
  await page.close(); 

});

test("Resister new user", async ({ page }) => {
  await homePage.clickOnSignUpLogin();
  await registerPage.enterNameEmail("Test User one", "testuserone@gmail.com");

  await registerPage.fillRegistrationForm({
    title: "Mr",
    password: "Password123",
    day: "10",
    month: "5",
    year: "1990",
    subscribeNewsletter: true,
    receiveOffers: true,
    firstName: "test",
    lastName: "user",
    company: "Test Company",
    address1: RandomDataUtil.getRandomAddress(),
    country: "United States",
    state: "Test State",
    city: "Test City",
    zipcode: RandomDataUtil.getRandomPin(),
    mobileNumber: RandomDataUtil.getPhoneNumber(),
  });

  await registerPage.verifyAccountCreated();
});


test("login with existing user and delete the user", async ({ page }) => {

  //const {validUser}
    await homePage.clickOnSignUpLogin();
    console.log(jsonData.ValidUser.email);
    await loginPage.loginToApplication(jsonData.ValidUser.email, jsonData.ValidUser.password); 
    await homePage.verifyLoggedInUser(jsonData.ValidUser.name);

    await homePage.clickOnDeleteAccount();
    await homePage.verifyUserDeleted();
});


test("Login with incorrect credentials", async ({ page }) => {
  await homePage.clickOnSignUpLogin();
  await loginPage.loginToApplication(jsonData.InvalidUser.email, jsonData.InvalidUser.password);
  await loginPage.verifyLoginErrorMessage("Your email or password is incorrect!");
}); 

test("Logout the user", async ({ page }) => {
  await homePage.clickOnSignUpLogin();
  await loginPage.loginToApplication(jsonData.ValidUser.email, jsonData.ValidUser.password); 
  await homePage.verifyLoggedInUser(jsonData.ValidUser.name);
  await homePage.clickOnLogout();
  await expect(page.locator("text=Login to your account")).toBeVisible();
});