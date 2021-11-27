export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  if (!removed) {
    return result;
  }
  result.splice(endIndex, 0, removed);

  return result;
}
