export function createListItems({ itemRepository }) {
  if (!itemRepository) throw new Error('itemRepository is required');

  return async function listItems() {
    return itemRepository.findAll();
  };
}
