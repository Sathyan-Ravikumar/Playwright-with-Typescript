import { Page,Locator } from "@playwright/test";

export default class LoginPageLocators {


    readonly loginEmailInput: Locator;
     readonly loginPasswordInput :Locator;
     readonly loginButton :Locator;
     readonly loginErrorMessage :Locator;

    
    constructor(page:Page) {
       
        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');  
        this.loginErrorMessage = page.locator("text=Your email or password is incorrect!");
    }
}