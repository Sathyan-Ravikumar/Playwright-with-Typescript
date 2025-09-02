import { Page, Locator } from "@playwright/test";
import { RegistrationData } from "../utils/RegistrationType";

export default class RegisterPage {
  private readonly page: Page;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly signupButton: Locator;

  //Registration form locators
  private readonly accountInformationHeader: Locator;
  private readonly titleMr: Locator;
  private readonly titleMrs: Locator;
  private readonly passwordInput: Locator;
  private readonly dobDay: Locator;
  private readonly dobMonth: Locator;
  private readonly dobYear: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly offersCheckbox: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address1: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobileNumber: Locator;
  private readonly createAccountBtn: Locator;
  private readonly company: Locator;
  private readonly address2: Locator;

  //account created locators
  private readonly accountCreatedHeader: Locator;
  private readonly successMessage: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
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
  }

  async enterNameEmail(name: string, email: string) {
    try {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.signupButton.click();
    } catch (error) {
      console.log("Error while entering name or email " + error);
      throw error;
    }
  }

  async fillRegistrationForm(data: RegistrationData) {
    await this.accountInformationHeader.waitFor({ state: "visible" });
    // Title
    if (data.title) {
      if (data.title === "Mr") {
        await this.titleMr.check();
      } else {
        await this.titleMrs.check();
      }
    }

    // Password
    await this.passwordInput.fill(data.password);

    // DOB dropdowns
    if (data.day && data.month && data.year) {
      await this.dobDay.selectOption(data.day);
      await this.dobMonth.selectOption(data.month);
      await this.dobYear.selectOption(data.year);
    }

    // Checkboxes
    if (data.subscribeNewsletter) {
      await this.newsletterCheckbox.check();
    }
    if (data.receiveOffers) {
      await this.offersCheckbox.check();
    }

    // Address info
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    if (data.company) await this.company.fill(data.company);
    await this.address1.fill(data.address1);
    if (data.address2) await this.address2.fill(data.address2);
    await this.country.selectOption(data.country);
    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipcode.fill(data.zipcode);
    await this.mobileNumber.fill(data.mobileNumber);

    // Submit
    await this.createAccountBtn.click();
  }

  async verifyAccountCreated() {
    await this.accountCreatedHeader.waitFor({ state: "visible" });
    const isVisible = await this.successMessage.isVisible();
    if (!isVisible) {
      throw new Error("Account creation success message not visible");
    }
    await this.continueButton.click();
  }
}
