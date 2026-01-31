import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

// ====== CONFIG ======
const INPUT_XLSX = path.resolve('data/users.xlsx');
const INPUT_SHEET = 'Sheet1';
const OUTPUT_XLSX = path.resolve('reports/results.xlsx');

// ====== TYPES ======
type LoginCase = {
  username: string;
  password: string;
  expected: string; // "success" | "fail"
};

type ResultRow = {
  username: string;
  expected: string;
  status: 'PASS' | 'FAIL';
  message?: string;
  error?: string;
  startedAt: string;
  finishedAt: string;
};

// ====== HELPERS ======
function readRowsFromXlsx(filePath: string, sheetName?: string): LoginCase[] {
  const wb = XLSX.readFile(filePath);
  const ws = wb.Sheets[sheetName || wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: ''
  });

  // Normalize + ensure required keys exist
  return rows.map((r) => ({
    username: String(r.username ?? ''),
    password: String(r.password ?? ''),
    expected: String(r.expected ?? '')
  }));
}

function writeRowsToXlsx(
  outPath: string,
  rows: ResultRow[],
  sheetName = 'Results'
): void {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  XLSX.writeFile(wb, outPath);
}

// ====== DATA ======
const cases: LoginCase[] = readRowsFromXlsx(INPUT_XLSX, INPUT_SHEET);
const results: ResultRow[] = [];

// ====== TESTS ======
for (const tc of cases) {
  test(`login xlsx: ${tc.username} => ${tc.expected}`, async ({ page }) => {
    const startedAt = new Date().toISOString();

    try {
      await page.goto('https://the-internet.herokuapp.com/login');

      await page.fill('#username', tc.username);
      await page.fill('#password', tc.password);
      await page.click('button[type="submit"]');

      const flash = page.locator('#flash');
      await expect(flash).toBeVisible();

      const msgText = (await flash.innerText()).trim();
      const isSuccess = msgText
        .toLowerCase()
        .includes('you logged into a secure area');

      const expected = tc.expected.trim().toLowerCase();
      if (expected === 'success') {
        expect(isSuccess).toBeTruthy();
      } else {
        expect(isSuccess).toBeFalsy();
      }

      results.push({
        username: tc.username,
        expected: tc.expected,
        status: 'PASS',
        message: msgText,
        startedAt,
        finishedAt: new Date().toISOString()
      });
    } catch (e) {
      results.push({
        username: tc.username,
        expected: tc.expected,
        status: 'FAIL',
        error: String(e),
        startedAt,
        finishedAt: new Date().toISOString()
      });
      throw e;
    }
  });
}

// ====== WRITE REPORT ONCE ======
test.afterAll(() => {
  writeRowsToXlsx(OUTPUT_XLSX, results, 'Results');
});
