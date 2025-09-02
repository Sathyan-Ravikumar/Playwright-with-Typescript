import {Locator, Page, test} from '@playwright/test';


export default class LoginPage {

    readonly page : Page;
    private readonly loginEmailInput: Locator;
    private readonly loginPasswordInput :Locator;
    private readonly loginButton :Locator;
    private readonly loginErrorMessage :Locator;
    constructor(page) {
        this.page = page;
        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');  
        this.loginErrorMessage = page.locator("text=Your email or password is incorrect!");
    }

    async enterLoginEmail(email: string) {
        try {
            await this.loginEmailInput.fill(email);
        } catch (error) {
            console.log("Error while entering email " + error);
            throw error;
        }
    }
    async enterLoginPassword(password: string) {
        try {
            await this.loginPasswordInput.fill(password);
        } catch (error) {
            console.log("Error while entering password " + error);
            throw error;
        }
    }
    async clickOnLoginButton() {
        try {
            await this.loginButton.click();
        } catch (error) {
            console.log("Error while clicking on login button " + error);
            throw error;
        }
    }

    async loginToApplication(email: string, password: string) {
        await this.enterLoginEmail(email);
        await this.enterLoginPassword(password);
        await this.clickOnLoginButton();
    }
    
    async verifyLoginErrorMessage(expectedMessage: string) {
        try {
            await test.expect(this.loginErrorMessage).toBeVisible();
            await test.expect(this.loginErrorMessage).toHaveText(expectedMessage);
        } catch (error) {
            console.log("Error while verifying login error message " + error);
            throw error;
        }
    }


}