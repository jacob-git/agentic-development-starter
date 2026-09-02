import { createItem } from './domain/item.js';
import { createListItems } from './application/list-items.js';
import { createInMemoryItemRepository } from './infrastructure/in-memory-item-repository.js';
import { createHttpServer } from './http/app.js';

const itemRepository = createInMemoryItemRepository([
  createItem({ id: '1', name: 'Architecture Guide', category: 'books' }),
  createItem({ id: '2', name: 'Testing Handbook', category: 'books' }),
  createItem({ id: '3', name: 'Developer Mug', category: 'merch' })
]);

const listItems = createListItems({ itemRepository });
const server = createHttpServer({ listItems });
const port = Number(process.env.PORT ?? 3000);

server.listen(port, () => {
  console.log(`Starter service listening on http://localhost:${port}`);
});
