import { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  // Navbar locators
  private readonly home: Locator;
  private readonly products: Locator;
  private readonly cart: Locator;
  private readonly signupLogin: Locator;
  private readonly testCases: Locator;
  private readonly contactUs: Locator;
  private readonly logout: Locator;
  private readonly deleteAccount: Locator;
  private readonly loggedInUser: Locator;

  private readonly accountDeletedHeader: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.home = page.getByRole("link", { name: " Home" });
    this.products = page.getByRole("link", { name: " Products" });
    this.cart = page.getByRole("link", { name: " Cart" });
    this.signupLogin = page.getByRole("link", { name: " Signup / Login" });
    this.testCases = page.getByRole("link", { name: " Test Cases" });
    this.contactUs = page.getByRole("link", { name: " Contact us" });
    this.logout = page.getByRole("link", { name: " Logout" });
    this.deleteAccount = page.getByRole("link", { name: " Delete Account" });
    this.loggedInUser = page.locator("a:has-text('Logged in as')");


    this.accountDeletedHeader = page.getByTestId("account-deleted");
    this.continueButton = page.getByTestId("continue-button");
  }

  async clickOnHome() {
    await this.home.click();
  }

  async clickOnProducts() {
    await this.products.click();
  }

  async clickOnCart() {
    await this.cart.click();
  }

  async clickOnSignUpLogin() {
    await this.signupLogin.click();
  }

  async clickOnTestCases() {
    await this.testCases.click();
  }

  async clickOnContactUs() {
    await this.contactUs.click();
  }

  async clickOnLogout() {
    await this.logout.click();
  }

  async clickOnDeleteAccount() {
    await this.deleteAccount.click();
  }

  async getLoggedInUserName(): Promise<string | null> {
    return await this.loggedInUser.textContent();
  }

async verifyLoggedInUser(expectedName: string) {
  await this.loggedInUser.waitFor({ state: "visible", timeout: 5000 });
  const text = await this.loggedInUser.textContent();
  if (!text) throw new Error("Logged in user element not found");

  // Extract name part
  let actualName = text.replace("Logged in as", "").trim();

  // Normalize multiple spaces → single space, and ignore case
  actualName = actualName.replace(/\s+/g, " ").toLowerCase();
  const normalizedExpected = expectedName.replace(/\s+/g, " ").toLowerCase();

  if (actualName !== normalizedExpected) {
    throw new Error(
      `Expected logged in user '${expectedName}', but found '${actualName}'`
    );
  }
}


  async verifyUserDeleted() {
    await this.accountDeletedHeader.waitFor({ state: "visible", timeout: 5000 });
    const isVisible = await this.accountDeletedHeader.isVisible();
    if (!isVisible) {
      throw new Error("Account deletion confirmation not visible");
    }
    await this.continueButton.click();
  }
}
