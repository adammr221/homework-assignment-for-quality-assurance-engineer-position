import type { Page } from "@playwright/test";

export default class FeedPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators

  public getProfileButton = (userName: string) =>
    this.page.locator(`[href="/profile/${userName}"]`);

  //Actions
  public async clickUserIcon(userName: string) {
    await this.getProfileButton(userName).click();
  }
}
