import { Page, Locator } from "@playwright/test";

export class ContactUsPageLocators {
  readonly contactUsHeader: Locator;
  readonly getInTouchHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly fileUploadInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    this.contactUsHeader = page.getByRole("heading", { name: "Contact Us" });
    this.getInTouchHeader = page.getByRole("heading", { name: "Get In Touch" });
    this.nameInput = page.getByTestId("name");
    this.emailInput = page.getByTestId("email");
    this.subjectInput = page.getByTestId("subject");
    this.messageTextarea = page.getByTestId("message");
    this.fileUploadInput = page.locator('input[type="file"][name="upload_file"]');
    this.submitButton = page.getByTestId("submit-button");
    this.successAlert = page.locator(".status.alert.alert-success");
    this.homeButton = page.getByRole("link", { name: " Home" }).nth(1);
  }
}
