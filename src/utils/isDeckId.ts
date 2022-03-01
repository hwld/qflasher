export const isDeckId = (arg: unknown): arg is string => {
  return typeof arg === "string" && !arg.includes("/") && arg !== "";
};
