import { useWithLoading } from "@/context/LoadingStateContext";
import {
  ErrorMessage,
  useWithAppErrorHandler,
} from "@/hooks/useWithAppErrorHandler";
import { useWithResult } from "@/hooks/useWithResult";
import { Operation } from "@/types";

export const useAppOperation = <A extends unknown[], R>(
  operation: Operation<A, R>,
  message?: ErrorMessage
) => {
  const withResult = useWithResult(operation);
  const withErrorHandler = useWithAppErrorHandler(withResult, message);
  return useWithLoading(withErrorHandler);
};
