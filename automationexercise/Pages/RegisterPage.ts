import { Page, Locator } from "@playwright/test";
import { RegistrationData } from "../utils/RegistrationType";
import RegisterPageLocators from "../locators/registerPage.locators";

export default class RegisterPage {
  private readonly page: Page;
  private readonly locators: RegisterPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new RegisterPageLocators(page);
  }

  async enterNameEmail(name: string, email: string) {
    try {
      await this.locators.nameInput.fill(name);
      await this.locators.emailInput.fill(email);
      await this.locators.signupButton.click();
    } catch (error) {
      console.log("Error while entering name or email " + error);
      throw error;
    }
  }

  async fillRegistrationForm(data: RegistrationData) {
    await this.locators.accountInformationHeader.waitFor({ state: "visible" });
    // Title
    if (data.title) {
      if (data.title === "Mr") {
        await this.locators.titleMr.check();
      } else {
        await this.locators.titleMrs.check();
      }
    }

    // Password
    await this.locators.passwordInput.fill(data.password);

    // DOB dropdowns
    if (data.day && data.month && data.year) {
      await this.locators.dobDay.selectOption(data.day);
      await this.locators.dobMonth.selectOption(data.month);
      await this.locators.dobYear.selectOption(data.year);
    }

    // Checkboxes
    if (data.subscribeNewsletter) {
      await this.locators.newsletterCheckbox.check();
    }
    if (data.receiveOffers) {
      await this.locators.offersCheckbox.check();
    }

    // Address info
    await this.locators.firstName.fill(data.firstName);
    await this.locators.lastName.fill(data.lastName);
    if (data.company) await this.locators.company.fill(data.company);
    await this.locators.address1.fill(data.address1);
    if (data.address2) await this.locators.address2.fill(data.address2);
    await this.locators.country.selectOption(data.country);
    await this.locators.state.fill(data.state);
    await this.locators.city.fill(data.city);
    await this.locators.zipcode.fill(data.zipcode);
    await this.locators.mobileNumber.fill(data.mobileNumber);

    // Submit
    await this.locators.createAccountBtn.click();
  }

  async verifyAccountCreated() {
    await this.locators.accountCreatedHeader.waitFor({ state: "visible" });
    const isVisible = await this.locators.successMessage.isVisible();
    if (!isVisible) {
      throw new Error("Account creation success message not visible");
    }
    await this.locators.continueButton.click();
  }

  async verifyEmailAlreadyExistError(expectedMessage: string) {
    try {
      await this.locators.registerErrorMessage.waitFor({ state: "visible" });
    } catch (error) {
      console.log("Error while waiting for error message " + error);
      throw error;
    }
  }
}
