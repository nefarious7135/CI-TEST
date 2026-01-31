import { expect, type Locator, type Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;

  // locators
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[id="frm:username"]');
    this.password = page.locator('[id="frm:password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(
      'https://10.137.20.37:8103/SFFWeb/pages/home/portal.jsf'
    );
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/Service Fulfillment/);
  }

  async fillUsername(user: string) {
    await this.username.fill(user);
  }

  async fillPassword(pass: string) {
    await this.password.fill(pass);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  // optional: ตัวรวม (ถ้าอยากใช้)
  async login(user: string, pass: string) {
    await this.fillUsername(user);
    await this.fillPassword(pass);
    await this.clickLogin();
  }

  async screenshot(path = 'Images/Web_SFF.png') {
    await this.page.screenshot({ path });
  }
}
