import { Operation, OperationWithResult } from "@/types";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type ErrorMessage = { title: string; description: string };
export const useWithAppErrorHandler = <T extends unknown[], K>(
  callback: OperationWithResult<Operation<T, K>>,
  { title, description }: ErrorMessage
): OperationWithResult<Operation<T, K>> => {
  const toast = useToast();

  return useCallback(
    async (...args) => {
      const result = await callback(...args);
      if (result.type === "error") {
        console.error(result.error);
        toast({ title, description, status: "error" });
      }
      return result;
    },
    [callback, description, title, toast]
  );
};
