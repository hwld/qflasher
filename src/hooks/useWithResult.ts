import { Operation, WithResult } from "@/types";
import { useCallback } from "react";

export type Result<T> =
  | { type: "success"; item: T }
  | { type: "error"; error: unknown };

export const useWithResult = <A extends unknown[], R>(
  callback: Operation<A, R>
): WithResult<Operation<A, R>> => {
  return useCallback(
    async (...args) => {
      try {
        const result = await callback(...args);
        return { type: "success", item: result };
      } catch (e) {
        return { type: "error", error: e };
      }
    },
    [callback]
  );
};
