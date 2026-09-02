import test from 'node:test';
import assert from 'node:assert/strict';
import { createHttpServer } from '../src/http/app.js';

async function withServer(listItems, callback) {
  const server = createHttpServer({ listItems });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const address = server.address();
    await callback(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('GET /health returns ok', async () => {
  await withServer(async () => [], async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
  });
});

test('GET /api/items returns items', async () => {
  const expected = [{ id: '1', name: 'Guide', category: 'books' }];
  await withServer(async () => expected, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/items`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { items: expected });
  });
});
