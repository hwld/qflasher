import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export const usePageLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useLoadingEffect(loading);

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);

    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", endLoading);
    router.events.on("routeChangeError", endLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", endLoading);
      router.events.off("routeChangeError", endLoading);
    };
  }, [router.events]);
};
