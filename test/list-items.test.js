import test from 'node:test';
import assert from 'node:assert/strict';
import { createListItems } from '../src/application/list-items.js';
import { createInMemoryItemRepository } from '../src/infrastructure/in-memory-item-repository.js';

test('listItems returns repository items', async () => {
  const itemRepository = createInMemoryItemRepository([
    { id: '1', name: 'Guide', category: 'books' }
  ]);
  const listItems = createListItems({ itemRepository });

  assert.deepEqual(await listItems(), [
    { id: '1', name: 'Guide', category: 'books' }
  ]);
});
