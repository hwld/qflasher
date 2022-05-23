import { Operation, WithResult } from "@/types";
import { Result } from "@/utils/result";
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
        console.error(e);
        return Result.Err();
      }
    },
    [callback]
  );
};
