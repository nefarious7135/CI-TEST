import { test, expect, APIResponse } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

// helper: ตรวจ status + content-type + return json
async function expectJsonResponse<T>(
  res: APIResponse,
  expectedStatus: number
): Promise<T> {
  expect(res.status(), 'status code').toBe(expectedStatus);

  const ct = res.headers()['content-type'] ?? '';
  expect(ct, 'content-type should be json').toContain('application/json');

  return (await res.json()) as T;
}

test.describe('CRUD + response checks (JSONPlaceholder)', () => {
  test('C: POST /posts', async ({ request }) => {
    const payload = { title: 'hello', body: 'world', userId: 1 };

    const res = await request.post(`${BASE}/posts`, { data: payload });
    const body = await expectJsonResponse<{
      id: number;
      title: string;
      body: string;
      userId: number;
    }>(res, 201);

    // schema-ish checks (type/structure)
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
        userId: expect.any(Number)
      })
    );

    // value checks
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
  });

  test('R: GET /posts/1', async ({ request }) => {
    const res = await request.get(`${BASE}/posts/1`);
    const body = await expectJsonResponse<{
      id: number;
      title: string;
      body: string;
      userId: number;
    }>(res, 200);

    expect(body.id).toBe(1);
    expect(body.title.length).toBeGreaterThan(0);
  });

  test('U: PUT /posts/1', async ({ request }) => {
    const payload = {
      id: 1,
      title: 'updated',
      body: 'updated body',
      userId: 1
    };

    const res = await request.put(`${BASE}/posts/1`, { data: payload });
    const body = await expectJsonResponse<typeof payload>(res, 200);

    expect(body).toEqual(expect.objectContaining(payload));
  });

  test('D: DELETE /posts/1', async ({ request }) => {
    const res = await request.delete(`${BASE}/posts/1`);

    // JSONPlaceholder มักคืน 200 (บาง API จะเป็น 204)
    expect([200, 204]).toContain(res.status());
  });
});
