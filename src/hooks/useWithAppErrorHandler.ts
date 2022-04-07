import { isErr, Operation, WithResult } from "@/types";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export type ErrorMessage = { title: string; description: string };
export const useWithAppErrorHandler = <A extends unknown[], R>(
  callback: WithResult<Operation<A, R>>,
  message: ErrorMessage = {
    title: "エラー",
    description: "エラーが発生しました。",
  }
): WithResult<Operation<A, R>> => {
  const toast = useToast();
  const { title, description } = message;

  return useCallback(
    async (...args) => {
      const result = await callback(...args);
      if (isErr(result)) {
        toast({ title, description, status: "error" });
      }
      return result;
    },
    [callback, description, title, toast]
  );
};
