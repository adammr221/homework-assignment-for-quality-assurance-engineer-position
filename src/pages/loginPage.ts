import type { Page } from "@playwright/test";
import type { Credentials } from "../types/user";

export default class LoginPage {
  readonly page: Page;
  public readonly credentialsInvalidError: string = "credentials invalid";

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  readonly getEmailTextBox = () =>
    this.page.getByRole("textbox", { name: "Email" });

  readonly getPasswordTextBox = () =>
    this.page.getByRole("textbox", { name: "Password" });

  readonly getSignInButton = () => this.page.locator('[type="submit"]');

  readonly getSignInTitle = () =>
    this.page.getByRole("heading", { name: "Sign in" });

  readonly getNeedanAccountText = () =>
    this.page.getByRole("link", { name: "Need an account?" });

  readonly getCredentialsInvalidErrorMessage = () =>
    this.page.locator(".error-messages li");

  //Actions
  public async enterEmail(email: string) {
    await this.getEmailTextBox().fill(email);
  }
  public async enterPassword(password: string) {
    await this.getPasswordTextBox().fill(password);
  }

  public async clickSignInButton() {
    await this.getSignInButton().click();
  }

  public async fillSignInForm(credentials: Credentials) {
    await this.enterEmail(credentials.email);
    await this.enterPassword(credentials.password);
  }
}
