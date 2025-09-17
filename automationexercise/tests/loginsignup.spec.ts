import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import { RandomDataUtil } from "../utils/RandomData";
import { DataProvider } from "../utils/DataProvider";
import dotenv from "dotenv";

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
test.describe.serial("register and delete user scenarios", () => {

  const email = RandomDataUtil.getEmail();
  const name = RandomDataUtil.getFullName();
  const password = "Password123";

  test("Resister new user", async ({ page }) => {
    await homePage.clickOnSignUpLogin();
    await registerPage.enterNameEmail(name, email);

    await registerPage.fillRegistrationForm({
      title: "Mr",
      password: password,
      day: "10",
      month: "5",
      year: "1990",
      subscribeNewsletter: true,
      receiveOffers: true,
      firstName: RandomDataUtil.getFirstName(),
      lastName: RandomDataUtil.getLastName(),
      company: "Test Company",
      address1: RandomDataUtil.getRandomAddress(),
      country: "United States",
      state: RandomDataUtil.getRandomState(),
      city: RandomDataUtil.getRandomCity(),
      zipcode: RandomDataUtil.getRandomPin(),
      mobileNumber: RandomDataUtil.getPhoneNumber(),
    });

    await registerPage.verifyAccountCreated();
  });

  test("login with existing user and delete the user", async ({ page }) => {
    //const {validUser}
    await homePage.clickOnSignUpLogin();
    console.log(email);
    await loginPage.loginToApplication(
      email,
      password
    );
    await homePage.verifyLoggedInUser(name);

    await homePage.clickOnDeleteAccount();
    await homePage.verifyUserDeleted();
  });
});

test("Login with incorrect credentials", async ({ page }) => {
  await homePage.clickOnSignUpLogin();
  await loginPage.loginToApplication(
    jsonData.InvalidUser.email,
    jsonData.InvalidUser.password
  );
  await loginPage.verifyLoginErrorMessage(
    "Your email or password is incorrect!"
  );
});

test("Logout the user", async ({ page }) => {
  await homePage.clickOnSignUpLogin();
  await loginPage.loginToApplication(
    jsonData.ValidUser.email,
    jsonData.ValidUser.password
  );
  await homePage.verifyLoggedInUser(jsonData.ValidUser.name);
  await homePage.clickOnLogout();
  await expect(page.locator("text=Login to your account")).toBeVisible();
});

test("Register with existing email", async ({ page }) => {
  await homePage.clickOnSignUpLogin();
  await registerPage.enterNameEmail(
    jsonData.ValidUser.name,
    jsonData.ValidUser.email
  );
  await registerPage.verifyEmailAlreadyExistError(
    "Email Address already exist!"
  );
});
