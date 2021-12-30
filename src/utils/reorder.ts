export function reorder<T>(list: T[], srcIndex: number, destIndex: number) {
  const result = [...list];
  const [target] = result.splice(srcIndex, 1);
  if (!target) {
    return result;
  }
  result.splice(destIndex, 0, target);

  return result;
}
