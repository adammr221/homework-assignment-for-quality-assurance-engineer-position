import { test as baseTest } from "@playwright/test";
import HomePage from "../pages/homePage";
import RegisterPage from "../pages/registerPage";
import FeedPage from "../pages/feedPage";
import type { User } from "../types/user";
import { createUser } from "../test-data/createUser";
import LoginPage from "../pages/loginPage";
import UserProfilePage from "../pages/userProfilePage";
import SettingsPage from "../pages/settingsPage";

interface PageObjectFixtures {
  homePage: HomePage;
  registerPage: RegisterPage;
  feedPage: FeedPage;
  loginPage: LoginPage;
  userProfilePage: UserProfilePage;
  settingsPage: SettingsPage;
  registeredUser: User;
}

export const test = baseTest.extend<PageObjectFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  feedPage: async ({ page }, use) => {
    const feedPage = new FeedPage(page);
    await use(feedPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  userProfilePage: async ({ page }, use) => {
    const userProfilePage = new UserProfilePage(page);
    await use(userProfilePage);
  },
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
  registeredUser: async ({ homePage, registerPage }, use) => {
    const user = createUser();
    await homePage.clickSignUpButton();
    await registerPage.fillRegistrationForm(user);
    await registerPage.clickSignUpButton();
    await use(user);
  },
});

export { expect } from "@playwright/test";
