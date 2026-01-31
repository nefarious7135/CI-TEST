import { expect, type Locator, type Page } from '@playwright/test';

export class WebFormPage {
  readonly page: Page;

  // URL
  readonly url = 'https://www.selenium.dev/selenium/web/web-form.html';

  // Locators (รวมไว้ที่เดียว)
  readonly textInput: Locator;
  readonly password: Locator;
  readonly textarea: Locator;

  readonly disabledInput: Locator;
  readonly readonlyInput: Locator;

  readonly dropdownSelect: Locator;
  readonly datalist: Locator;

  readonly fileInputButton: Locator; // role=button name="File input" (ตัวอย่างตามโค้ดเดิม)
  readonly checkedCheckbox: Locator;
  readonly defaultCheckbox: Locator;
  readonly defaultRadioText: Locator;

  readonly colorPicker: Locator;
  readonly datePicker: Locator;
  readonly rangeSlider: Locator;

  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // แนะนำให้ใช้ getByRole/getByLabel เหมือนเดิม (ทนกว่า xpath/css)
    this.textInput = page.getByRole('textbox', { name: 'Text input' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.textarea = page.getByRole('textbox', { name: 'Textarea' });

    this.disabledInput = page.locator('input[name="my-disabled"]');
    this.readonlyInput = page.locator('input[name="my-readonly"]');

    this.dropdownSelect = page.getByLabel('Dropdown (select) Open this');
    this.datalist = page.getByRole('combobox', { name: 'Dropdown (datalist)' });

    this.fileInputButton = page.getByRole('button', { name: 'File input' });
    this.checkedCheckbox = page.getByRole('checkbox', {
      name: 'Checked checkbox'
    });
    this.defaultCheckbox = page.getByRole('checkbox', {
      name: 'Default checkbox'
    });
    this.defaultRadioText = page.getByText('Default radio');

    this.colorPicker = page.getByRole('textbox', { name: 'Color picker' });
    this.datePicker = page.getByRole('textbox', { name: 'Date picker' });
    this.rangeSlider = page.getByRole('slider', { name: 'Example range' });

    this.submitBtn = page.getByRole('button', { name: 'Submit' });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveTitle(/Web form/);
  }

  async fillBasicInfo(username: string, password: string, address: string) {
    await this.textInput.fill(username);
    await this.password.fill(password);
    await this.textarea.pressSequentially(address, { delay: 100 });
  }

  async assertDisabledAndReadonly() {
    await expect(this.disabledInput).toBeDisabled();
    await expect(this.disabledInput).toHaveAttribute('disabled');

    await expect(this.readonlyInput).toBeEnabled();
    await expect(this.readonlyInput).not.toBeEditable();
    await expect(this.readonlyInput).toHaveAttribute('readonly');
  }

  async setDropdowns(selectValue: string, datalistValue: string) {
    await this.dropdownSelect.selectOption(selectValue);
    await this.datalist.fill(datalistValue);
  }

  async setFile(filePath: string) {
    // ตามโค้ดเดิมคุณ setInputFiles ที่ปุ่ม (แต่ปกติมักจะเป็น input[type=file])
    await this.fileInputButton.setInputFiles(filePath);
  }

  async setChecksAndRadio() {
    await this.checkedCheckbox.uncheck();
    await this.defaultCheckbox.check();
    await this.defaultRadioText.click();
  }

  async setColor(colorHex: string) {
    await this.colorPicker.fill(colorHex);
  }

  async setDate(mmddyyyy: string) {
    await this.datePicker.pressSequentially(mmddyyyy, { delay: 100 });
    await expect(this.datePicker).toHaveValue(mmddyyyy);
    await this.page.locator('body').click(); // close picker / blur
  }

  async setRange(value: string) {
    await this.rangeSlider.fill(value);
  }

  async screenshot(path: string) {
    await this.page.screenshot({ path });
  }

  async submit() {
    await this.submitBtn.click();
  }
}
