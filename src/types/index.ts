import { Result } from "@/utils/result";

export type Operation<T extends unknown[], R> = (...args: T) => Promise<R>;
export type WithResult<T extends Operation<any, any>> = (
  ...args: Parameters<T>
) => Promise<Result<Awaited<ReturnType<T>>>>;
