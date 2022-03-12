import { Operation, WithResult } from "@/types";
import { useCallback } from "react";

export const useWithResult = <A extends unknown[], R>(
  callback: Operation<A, R>
): WithResult<Operation<A, R>> => {
  return useCallback(
    async (...args) => {
      try {
        const result = await callback(...args);
        return { status: "success", data: result, error: undefined };
      } catch (e) {
        return { status: "error", data: undefined, error: undefined };
      }
    },
    [callback]
  );
};
