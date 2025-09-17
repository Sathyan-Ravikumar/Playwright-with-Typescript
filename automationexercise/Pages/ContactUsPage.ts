import { Page, Locator, expect } from "@playwright/test";
import { ContactUsPageLocators } from "../locators/contactusPage.locators";



export default class ContactUsPage {
  private readonly page: Page;
  private readonly locators: ContactUsPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new ContactUsPageLocators(page);
  }

  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
    filePath?: string
  ) {
    await this.locators.contactUsHeader.waitFor({ state: "visible" });
    await this.locators.getInTouchHeader.waitFor({ state: "visible" });
    await this.locators.nameInput.fill(name);
    await this.locators.emailInput.fill(email);
    await this.locators.subjectInput.fill(subject);
    await this.locators.messageTextarea.fill(message);
    if (filePath) {
      await this.locators.fileUploadInput.setInputFiles(filePath);
    }
    
  }

async submitForm(){
    await this.locators.submitButton.click();
    await this.page.waitForTimeout(2000);
}

  async verifySuccessMessage(expectedMessage: string) {
      await this.locators.successAlert.waitFor({ state: "visible" });
    await expect(this.locators.successAlert).toHaveText(expectedMessage);
  }

  async clickOnHomeButton() {
    
      await this.locators.homeButton.click();
  }
}
