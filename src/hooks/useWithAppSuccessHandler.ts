import { isOk, Operation, WithResult } from "@/types";
import { useToast } from "@chakra-ui/react";
import { ReactNode, useCallback } from "react";

type UseWithAppSuccessHandlerOption<R> = {
  getMessage: (item: R) => ReactNode;
  isWarning?: (item: R) => boolean;
};

export const useWithAppSuccessHandler = <A extends unknown[], R>(
  callback: WithResult<Operation<A, R>>,
  { getMessage, isWarning = () => false }: UseWithAppSuccessHandlerOption<R>
): WithResult<Operation<A, R>> => {
  const toast = useToast();

  return useCallback(
    async (...args) => {
      const result = await callback(...args);
      if (isOk(result)) {
        const message = getMessage(result.data);
        toast({
          description: message,
          status: isWarning(result.data) ? "warning" : "success",
        });
      }
      return result;
    },
    [callback, getMessage, isWarning, toast]
  );
};
