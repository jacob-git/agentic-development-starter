export function createItem({ id, name, category }) {
  const normalizedName = String(name ?? '').trim();
  const normalizedCategory = String(category ?? '').trim();

  if (!id) throw new Error('id is required');
  if (!normalizedName) throw new Error('name is required');
  if (!normalizedCategory) throw new Error('category is required');

  return Object.freeze({
    id,
    name: normalizedName,
    category: normalizedCategory
  });
}
