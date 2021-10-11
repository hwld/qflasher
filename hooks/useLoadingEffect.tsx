import { useEffect, useRef } from "react";
import { useSetAppState } from "../context/AppStateContextProvider";

export const useLoadingEffect = (isLoading: boolean) => {
  const { startLoading, endLoading } = useSetAppState();
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
};