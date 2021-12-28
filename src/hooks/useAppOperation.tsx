import { useWithLoading } from "../context/LoadingStateContext";
import { useWithErrorHandling } from "./useWithErrorHandling";

type Option = { errorTitle: string; errorDescription: string };

export const useAppOperation = <_, T>(
  operation: (arg: T) => Promise<void>,
  option: Option = {
    errorTitle: "エラー",
    errorDescription: "エラーが発生しました",
  }
) => {
  const withErrorHandling = useWithErrorHandling(operation, {
    title: option.errorTitle,
    description: option.errorDescription,
  });
  return useWithLoading(withErrorHandling);
};
