import { useLoadingAction } from "@/context/LoadingStateContext";
import { useEffect } from "react";

export const useAppLoading = () => {
  const { startLoading, endLoading } = useLoadingAction();

  // ホストコンポーネントのマウント時にローディングを開始し、
  // アンマウント時にローディングを終了する。
  useEffect(() => {
    const id = startLoading();
    return () => {
      endLoading(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
