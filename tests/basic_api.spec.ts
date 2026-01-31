import { test, expect } from '@playwright/test';
import 'dotenv/config';
import Ajv from 'ajv';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';
const EXPECTED_TITLE =
  'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';

// AJV setup
const ajv = new Ajv({ allErrors: true });

const postSchema = {
  type: 'object',
  required: ['userId', 'id', 'title', 'body'],
  additionalProperties: true,
  properties: {
    userId: { type: 'number' },
    id: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    body: { type: 'string' }
  }
} as const;

const validatePost = ajv.compile(postSchema);

test('GET /posts/1 - Case1(status) Case2(schema AJV) Case3(body)', async ({
  request
}) => {
  const res = await request.get(URL);

  // เคส 1: status code + status text (+ header json)
  await test.step('Case 1: status code & status text', async () => {
    expect(res.status()).toBe(200);
    expect(res.statusText()).toBe('OK');
    expect(res.headers()['content-type']).toContain('application/json');
  });

  const body = await res.json();
  console.log('STUB_BASE_URL:', process.env.STUB_BASE_URL);

  // เคส 2: schema ด้วย AJV
  await test.step('Case 2: response schema (AJV)', async () => {
    const ok = validatePost(body);
    expect(ok).toBe(true);
    console.log(body);
    if (!ok) console.log(validatePost.errors);
  });

  // เคส 3: response body values
  await test.step('Case 3: response body', async () => {
    expect(body.userId).toBe(1);
    expect(body.id).toBe(1);
    expect(body.title).toBe(EXPECTED_TITLE);
    expect(body).toHaveProperty('title');
  });
});
