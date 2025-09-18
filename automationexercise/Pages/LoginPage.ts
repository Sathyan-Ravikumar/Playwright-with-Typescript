import { Page, test} from '@playwright/test';
import LoginPageLocators from '../locators/loginPage.locators';

export default class LoginPage {

    readonly page : Page;
    private readonly locators: LoginPageLocators;


    constructor(page) {
        this.page = page;
        this.locators = new LoginPageLocators(page);
    }

    async enterLoginEmail(email: string) {
        try {
            await this.locators.loginEmailInput.fill(email);
        } catch (error) {
            console.log("Error while entering email " + error);
            throw error;
        }
    }
    async enterLoginPassword(password: string) {
        try {
            await this.locators.loginPasswordInput.fill(password);
        } catch (error) {
            console.log("Error while entering password " + error);
            throw error;
        }
    }
    async clickOnLoginButton() {
        try {
            await this.locators.loginButton.click();
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
            await test.expect(this.locators.loginErrorMessage).toBeVisible();
            await test.expect(this.locators.loginErrorMessage).toHaveText(expectedMessage);
        } catch (error) {
            console.log("Error while verifying login error message " + error);
            throw error;
        }
    }


}