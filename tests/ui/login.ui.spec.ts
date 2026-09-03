import { expect, test } from "../../src/fixtures/uiTestFixtures";
import {
  userWithInvalidEmail,
  userWithEmptyEmail,
  userWithEmptyPassword,
} from "../../src/test-data/invalidUsers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Login", () => {
  test("Should successfully logout and login a registered user", async ({
    registeredUser,
    feedPage,
    userProfilePage,
    settingsPage,
    loginPage,
    homePage,
  }) => {
    const userName = registeredUser.username;
    await feedPage.clickUserIcon(userName);
    await expect(userProfilePage.getTitle(userName)).toBeVisible();
    await userProfilePage.clickEditProfileSettingsButton();
    await expect(settingsPage.getYoutSettingsTitle()).toBeVisible();
    await settingsPage.clickLogOut();
    await homePage.verifyNavigationItems();
    await homePage.clickSignInButton();
    await expect(loginPage.getSignInTitle()).toBeVisible();
    await expect(loginPage.getNeedanAccountText()).toBeVisible();
    await expect(loginPage.getSignInButton()).toBeDisabled();
    await loginPage.fillSignInForm(registeredUser);
    await expect(loginPage.getSignInButton()).toBeEnabled();
    await loginPage.clickSignInButton();
    await expect(feedPage.getProfileButton(userName)).toBeVisible();
  });

  test("Should not sign in with invalid email", async ({
    homePage,
    loginPage,
  }) => {
    const invalidUser = userWithInvalidEmail;
    await homePage.clickSignInButton();
    await loginPage.fillSignInForm(invalidUser);
    await loginPage.clickSignInButton();
    await expect(loginPage.getCredentialsInvalidErrorMessage()).toBeVisible();
    await expect(loginPage.getCredentialsInvalidErrorMessage()).toHaveText(
      loginPage.credentialsInvalidError,
    );
  });

  test("Should not sign in with invalid password", async ({
    registeredUser,
    homePage,
    loginPage,
  }) => {
    const user = registeredUser;
    user.password = "wrongpassword";
    homePage.clickSignInButton();
    loginPage.fillSignInForm(user);
    await loginPage.clickSignInButton();
    await expect(loginPage.getCredentialsInvalidErrorMessage()).toBeVisible();
    await expect(loginPage.getCredentialsInvalidErrorMessage()).toHaveText(
      loginPage.credentialsInvalidError,
    );
  });

  test("Should not sign in without an email", async ({
    homePage,
    loginPage,
  }) => {
    const invalidUser = userWithEmptyEmail;
    await homePage.clickSignInButton();
    await loginPage.fillSignInForm(invalidUser);
    await expect(loginPage.getSignInButton()).toBeDisabled();
  });

  test("Should not sign in without a password", async ({
    homePage,
    loginPage,
  }) => {
    const invalidUser = userWithEmptyPassword;
    await homePage.clickSignInButton();
    await loginPage.fillSignInForm(invalidUser);
    await expect(loginPage.getSignInButton()).toBeDisabled();
  });
});
