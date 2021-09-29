export function getShuffledArray<T>(array: T[]): T[] {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[random]] = [clone[random], clone[i]];
  }
  return clone;
}
