export function createInMemoryItemRepository(initialItems = []) {
  const items = [...initialItems];

  return {
    async findAll() {
      return items.map((item) => ({ ...item }));
    }
  };
}
