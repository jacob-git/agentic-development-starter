import { createServer } from 'node:http';

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

export function createHttpServer({ listItems }) {
  if (!listItems) throw new Error('listItems is required');

  return createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');

    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok' });
    }

    if (request.method === 'GET' && url.pathname === '/api/items') {
      const items = await listItems();
      return sendJson(response, 200, { items });
    }

    return sendJson(response, 404, { error: 'Not found' });
  });
}
