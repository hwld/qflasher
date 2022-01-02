import { Operation, OperationWithResult } from "@/types";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useWithAppSuccessHandler = <T extends unknown[], K>(
  callback: OperationWithResult<Operation<T, K>>,
  getMessage: (item: K) => string
): OperationWithResult<Operation<T, K>> => {
  const toast = useToast();

  return useCallback(
    async (...args) => {
      const result = await callback(...args);
      if (result.type === "success") {
        const message = getMessage(result.item);
        toast({ description: message, status: "success" });
      }
      return result;
    },
    [callback, getMessage, toast]
  );
};
