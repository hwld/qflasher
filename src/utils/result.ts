// すべてのstatusでプロパティ名を同じにするほうが扱いやすいと感じたのでこうしている。
// 例えばTにundefinedが入ってくることがあって、undefinedのokとerrorを一緒に扱いたいときに、
// loadingをチェックしたあとに result.data === undefined とできるけど、
// そもそもerrorとokを一緒に扱うっていうのが設計的にまずい？
type LoadingResult = { status: "loading"; data: undefined; error: undefined };
type OkResult<T> = { status: "ok"; data: T; error: undefined };
type ErrorResult<E> = {
  status: "error";
  data: undefined;
  error: E | undefined;
};

export type Result<T, E = undefined> =
  | LoadingResult
  | OkResult<T>
  | ErrorResult<E>;

export const Result = {
  Loading: (): LoadingResult => ({
    status: "loading",
    data: undefined,
    error: undefined,
  }),
  Ok: <T>(data: T): OkResult<T> => ({
    status: "ok",
    data,
    error: undefined,
  }),
  Err: <E>(error?: E): ErrorResult<E> => ({
    status: "error",
    data: undefined,
    error: error,
  }),
} as const;

export const isLoading = <T, E>(
  result: Result<T, E>
): result is LoadingResult => {
  return result.status === "loading";
};
export const isOk = <T, E>(result: Result<T, E>): result is OkResult<T> => {
  return result.status === "ok";
};
export const isErr = <T, E>(result: Result<T, E>): result is ErrorResult<E> => {
  return result.status === "error";
};
