import { Result } from "@/utils/result";
import { keyframes } from "@emotion/react";

export type Operation<T extends unknown[], R> = (...args: T) => Promise<R>;
export type WithResult<T extends Operation<any, any>> = (
  ...args: Parameters<T>
) => Promise<Result<Awaited<ReturnType<T>>>>;

export type AppKeyframes = ReturnType<typeof keyframes>;
