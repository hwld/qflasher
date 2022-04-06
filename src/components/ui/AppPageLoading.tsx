import { useLoadingAction } from "@/context/LoadingStateContext";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useEffect, useRef } from "react";

export const AppPageLoading: React.VFC = () => {
  const router = useAppRouter();
  const { startLoading: start, endLoading: end } = useLoadingAction();
  const id = useRef<string | undefined>();

  useEffect(() => {
    const endLoading = () => {
      if (id.current) {
        end(id.current);
      }
    };
    const startLoading = () => {
      endLoading();
      id.current = start();
    };

    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", endLoading);
    router.events.on("routeChangeError", endLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", endLoading);
      router.events.off("routeChangeError", endLoading);
    };
  }, [end, router.events, start]);

  return null;
};
