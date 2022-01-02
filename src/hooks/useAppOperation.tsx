import { useWithLoading } from "@/context/LoadingStateContext";
import { useWithAppErrorHandler } from "@/hooks/useWithAppErrorHandler";
import { useWithResult } from "@/hooks/useWithResult";
import { Operation } from "@/types";

type Option = { errorTitle: string; errorDescription: string };

export const useAppOperation = <T extends unknown[], K>(
  operation: Operation<T, K>,
  option: Option = {
    errorTitle: "エラー",
    errorDescription: "エラーが発生しました",
  }
) => {
  const withLoading = useWithLoading(operation);
  const withResult = useWithResult(withLoading);
  return useWithAppErrorHandler(withResult, {
    title: option.errorTitle,
    description: option.errorDescription,
  });
};
