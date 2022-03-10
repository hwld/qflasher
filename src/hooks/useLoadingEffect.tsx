import { useLoadingAction } from "@/context/LoadingStateContext";
import { useEffect, useRef } from "react";

export const useLoadingEffect = (isLoading: boolean) => {
  const { startLoading, endLoading } = useLoadingAction();
  const loadingId = useRef<string | undefined>();

  useEffect(() => {
    if (isLoading) {
      loadingId.current = startLoading();
    }
  }, [isLoading, startLoading]);
  useEffect(() => {
    if (!isLoading && loadingId.current) {
      endLoading(loadingId.current);
      loadingId.current = undefined;
    }
  }, [endLoading, isLoading]);

  // 破棄されたらローディングを終了させる
  useEffect(() => {
    return () => {
      if (loadingId.current) {
        endLoading(loadingId.current);
        loadingId.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
