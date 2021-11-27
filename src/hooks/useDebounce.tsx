import { useCallback, useRef } from "react";

export const useDebounce = (ms: number, callback: () => void) => {
  const timer = useRef<number>();

  const func = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(callback, ms);
  }, [callback, ms]);

  return func;
};
