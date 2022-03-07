export const isFirst = <T, K extends keyof T>(arr: T[], field: K, el: T[K]) => {
  const index = arr.findIndex((a) => {
    return a[field] === el;
  });
  return index === 0;
};

export const isLast = <T, K extends keyof T>(arr: T[], field: K, el: T[K]) => {
  const index = arr.findIndex((a) => {
    return a[field] === el;
  });
  return index === arr.length - 1;
};

export const first = <T, K extends keyof T>(arr: T[], field: K) => {
  return arr[0]?.[field];
};

export const last = <T, K extends keyof T>(arr: T[], field: K) => {
  return arr[arr.length - 1]?.[field];
};

export const prev = <T, K extends keyof T>(arr: T[], field: K, el: T[K]) => {
  const index = arr.findIndex((a) => a[field] === el);
  if (index < 0) {
    return null;
  }
  const value = arr[index - 1]?.[field];
  if (!value) {
    return null;
  }
  return value;
};

export const next = <T, K extends keyof T>(arr: T[], field: K, el: T[K]) => {
  const index = arr.findIndex((a) => a[field] === el);
  if (index === -1 || index >= arr.length) {
    return null;
  }

  const value = arr[index + 1]?.[field];
  if (!value) {
    return null;
  }

  return value;
};
