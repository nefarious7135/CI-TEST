import { test, expect } from '@playwright/test';
import { WebFormPage } from '../pages/WebFormPage';

test('Test Web Form (POM)', async ({ page }) => {
  const webForm = new WebFormPage(page);

  await webForm.goto();

  await webForm.fillBasicInfo(
    'kachain.a',
    '1234567890',
    'PV Apartment 111 (Room 1522)'
  );

  await webForm.assertDisabledAndReadonly();

  await webForm.setDropdowns('2', 'New York');
  await webForm.setFile('Home_Page.png');

  await webForm.setChecksAndRadio();
  await webForm.setColor('#1ce10e');
  await webForm.setDate('05/14/2025');
  await webForm.setRange('8');

  await webForm.screenshot('Images/Web_form.png');

  await page.waitForTimeout(3000);
  // await webForm.submit();

  // await expect(page).toHaveTitle(/Web form - target page/);
  // await page.screenshot({ path: 'Images/Target_page.png' });
});
