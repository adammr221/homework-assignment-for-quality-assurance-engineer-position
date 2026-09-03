import type { Page } from "@playwright/test";

export default class SettingsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  private getlogOutButton = () =>
    this.page.getByText("Or click here to logout.");
  readonly getYoutSettingsTitle = () =>
    this.page.getByRole("heading", { name: "Your Settings" });

  //Actions
  public async clickLogOut() {
    await this.getlogOutButton().click();
  }
}
