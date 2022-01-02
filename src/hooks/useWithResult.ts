import { Operation, OperationWithResult } from "@/types";
import { useCallback } from "react";

export type Result<T> =
  | { type: "success"; item: T }
  | { type: "error"; error: unknown };

export const useWithResult = <T extends unknown[], K>(
  callback: Operation<T, K>
): OperationWithResult<Operation<T, K>> => {
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
