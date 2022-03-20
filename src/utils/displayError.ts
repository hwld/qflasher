export const displayErrors = (...error: unknown[]) => {
  error.forEach((e) => {
    if (e) {
      console.error(e);
    }
  });
};
