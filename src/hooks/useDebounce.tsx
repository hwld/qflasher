import { useCallback, useRef } from "react";

export const useDebounce = <T extends unknown[]>(
  ms: number,
  callback: (...arg: T) => void
) => {
  const timer = useRef<number>();

  const func = useCallback(
    (...args: T) => {
      console.log("f: ", ms);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        callback(...args);
      }, ms);
    },
    [callback, ms]
  );

  return func;
};
