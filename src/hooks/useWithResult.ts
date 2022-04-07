import { Operation, Result, WithResult } from "@/types";
import { useCallback } from "react";

export const useWithResult = <A extends unknown[], R>(
  callback: Operation<A, R>
): WithResult<Operation<A, R>> => {
  return useCallback(
    async (...args) => {
      try {
        const result = await callback(...args);
        return Result.Ok(result);
      } catch (e) {
        return Result.Err();
      }
    },
    [callback]
  );
};
