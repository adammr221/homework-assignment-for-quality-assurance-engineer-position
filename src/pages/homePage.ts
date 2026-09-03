import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export default class HomePage {
  readonly page: Page;

  private expectedNavItems: string[] = ["Home", "Sign in", "Sign up"];

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  private getSignInNavButton = () =>
    this.page.getByRole("link", { name: "Sign in" });
  private getSignUpNavButton = () =>
    this.page.getByRole("link", { name: "Sign up" });
  private getActualNavItems = () =>
    this.page.locator("ul.navbar-nav li a").allTextContents();

  //Actions
  public async clickSignInButton() {
    await this.getSignInNavButton().click();
  }

  public async clickSignUpButton() {
    await this.getSignUpNavButton().click();
  }

  public async verifyNavigationItems() {
    expect((await this.getActualNavItems()).map((text) => text.trim())).toEqual(
      this.expectedNavItems,
    );
  }
}
