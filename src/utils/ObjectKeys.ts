export const objectKeys: <T extends Record<string, unknown>>(
  obj: T
) => (keyof T)[] = (obj) => {
  return Object.keys(obj) as (keyof typeof obj)[];
};
