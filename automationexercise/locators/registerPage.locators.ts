import { Locator, Page } from "@playwright/test";

export default class RegisterPageLocators {
   readonly nameInput: Locator;
   readonly emailInput: Locator;
   readonly signupButton: Locator;

  //Registration form locators
   readonly accountInformationHeader: Locator;
   readonly titleMr: Locator;
   readonly titleMrs: Locator;
   readonly passwordInput: Locator;
   readonly dobDay: Locator;
   readonly dobMonth: Locator;
   readonly dobYear: Locator;
   readonly newsletterCheckbox: Locator;
   readonly offersCheckbox: Locator;
   readonly firstName: Locator;
   readonly lastName: Locator;
   readonly address1: Locator;
   readonly country: Locator;
   readonly state: Locator;
   readonly city: Locator;
   readonly zipcode: Locator;
   readonly mobileNumber: Locator;
   readonly createAccountBtn: Locator;
   readonly company: Locator;
   readonly address2: Locator;

  //account created locators
   readonly accountCreatedHeader: Locator;
   readonly successMessage: Locator;
   readonly continueButton: Locator;

   readonly registerErrorMessage: Locator;

  constructor(page: Page) {
 
    this.nameInput = page.getByTestId("signup-name");
    this.emailInput = page.getByTestId("signup-email");
    this.signupButton = page.getByTestId("signup-button");

    this.accountInformationHeader = page.getByRole("heading", {
      name: "Enter Account Information",
    });
    this.titleMr = page.locator("input#id_gender1");
    this.titleMrs = page.locator("input#id_gender2");
    this.passwordInput = page.locator("input#password");
    this.dobDay = page.getByTestId("days");
    this.dobMonth = page.getByTestId("months");
    this.dobYear = page.getByTestId("years");
    this.newsletterCheckbox = page.locator("input#newsletter");
    this.offersCheckbox = page.locator("input#optin");
    this.firstName = page.getByTestId("first_name");
    this.lastName = page.getByTestId("last_name");
    this.company = page.getByTestId("company");
    this.address1 = page.getByTestId("address");
    this.address2 = page.getByTestId("address2");
    this.country = page.locator("select#country");
    this.state = page.getByTestId("state");
    this.city = page.getByTestId("city");
    this.zipcode = page.getByTestId("zipcode");
    this.mobileNumber = page.getByTestId("mobile_number");
    this.createAccountBtn = page.getByTestId("create-account");

    this.accountCreatedHeader = page.getByRole("heading", {
      name: "Account Created!",
    });
    this.successMessage = page.locator(
      'p:has-text("Congratulations! Your new account has been successfully created!")'
    );
    this.continueButton = page.getByTestId("continue-button");

    this.registerErrorMessage = page.locator(
      "text=Email Address already exist!"
    );
  }
}