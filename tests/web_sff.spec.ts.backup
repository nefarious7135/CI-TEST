import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login Page 1', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectTitle();

  await loginPage.fillUsername('auto');
  await loginPage.fillPassword('auto');
  await loginPage.clickLogin();
  await loginPage.screenshot('Images/Web_SFF.png');
});
