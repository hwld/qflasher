import { useWithLoading } from "@/context/LoadingStateContext";
import { useWithErrorHandling } from "@/hooks/useWithErrorHandling";

type Operation<T> = (arg: T) => Promise<unknown>;
type Option = { errorTitle: string; errorDescription: string };

export const useAppOperation = <T, _>(
  operation: Operation<T>,
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
