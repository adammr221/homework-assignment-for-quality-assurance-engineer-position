import type { Page } from "@playwright/test";

export default class UserProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  private getEditProfileSettingsButton = () =>
    this.page.getByRole("link", { name: "Edit Profile Settings" });

  readonly getTitle = (userName: string) =>
    this.page.getByRole("heading", { name: userName });

  //Actions
  public async clickEditProfileSettingsButton() {
    await this.getEditProfileSettingsButton().click();
  }
}
