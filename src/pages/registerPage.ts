import type { Page } from "@playwright/test";
import type { User } from "../types/user";

export default class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locatos
  readonly getUserNameTextBox = () =>
    this.page.getByRole("textbox", { name: "Username" });
  readonly getEmailTextBox = () =>
    this.page.getByRole("textbox", { name: "Email" });
  readonly getPasswordTextBox = () =>
    this.page.getByRole("textbox", { name: "Password" });
  readonly getSignUptitle = () =>
    this.page.getByRole("heading", { name: "Sign up" });
  readonly getHaveAnAccountText = () =>
    this.page.getByRole("link", { name: "Have an account?" });
  readonly getSignUpButton = () => this.page.locator('[type="submit"]');

  //Actions
  public async enterUserName(userName: string) {
    await this.getUserNameTextBox().fill(userName);
  }
  public async enterEmail(email: string) {
    await this.getEmailTextBox().fill(email);
  }
  public async enterPassword(password: string) {
    await this.getPasswordTextBox().fill(password);
  }

  public async clickSignUpButton() {
    await this.getSignUpButton().click();
  }

  public async fillRegistrationForm(user: User) {
    await this.enterUserName(user.username);
    await this.enterEmail(user.email);
    await this.enterPassword(user.password);
  }
}
