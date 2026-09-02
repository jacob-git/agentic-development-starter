import test from 'node:test';
import assert from 'node:assert/strict';
import { createItem } from '../src/domain/item.js';

test('createItem trims name and category', () => {
  const item = createItem({ id: '1', name: '  Guide  ', category: ' books ' });
  assert.deepEqual(item, { id: '1', name: 'Guide', category: 'books' });
});

test('createItem rejects missing business fields', () => {
  assert.throws(() => createItem({ id: '1', name: '', category: 'books' }), /name is required/);
  assert.throws(() => createItem({ id: '1', name: 'Guide', category: '' }), /category is required/);
});
