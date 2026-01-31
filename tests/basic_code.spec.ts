import { test } from '@playwright/test';

test('For loop', async () => {
  for (const name of ['A', 'B', 'C']) {
    console.log(name);
  }
});

test('debug', async () => {
  console.log('debug'); // ✅ ไม่ฟ้องถ้า no-console off ใน tests
  const x: any = { a: 1 }; // ✅ ถ้า no-explicit-any off
  console.log(x);
});
