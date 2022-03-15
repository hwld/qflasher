import { Operation } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

type LoadingState = { isLoading: boolean };
type LoadingAction = {
  startLoading: () => string;
  endLoading: (id: string) => void;
};

const LoadingStateContext = createContext<LoadingState | undefined>(undefined);
const LoadingActionContext = createContext<LoadingAction | undefined>(
  undefined
);

export const LoadingProvider: React.FC = ({ children }) => {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const isLoading = useMemo(() => {
    return loadingIds?.length !== 0;
  }, [loadingIds]);

  const startLoading = useCallback((): string => {
    const id = uuid();
    setLoadingIds((items) => [...items, id]);
    return id;
  }, []);

  const endLoading = useCallback((id: string) => {
    setTimeout(() => setLoadingIds((ids) => ids.filter((i) => i !== id)), 500);
  }, []);

  return (
    <LoadingStateContext.Provider value={{ isLoading }}>
      <LoadingActionContext.Provider value={{ startLoading, endLoading }}>
        {children}
      </LoadingActionContext.Provider>
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => {
  const context = useContext(LoadingStateContext);
  if (!context) {
    throw new Error("useLoadingState must be used within a LoadingProvider.");
  }
  return context;
};
export const useLoadingAction = () => {
  const context = useContext(LoadingActionContext);
  if (!context) {
    throw new Error("useLoadingAction must be used within a LoadingProvider.");
  }
  return context;
};

export const useWithLoading = <T extends unknown[], K>(
  callback: Operation<T, K>
): Operation<T, K> => {
  const { startLoading, endLoading } = useLoadingAction();

  // callbackの戻り値をそのまま返す
  return useCallback(
    async (...args) => {
      let id = startLoading();
      const result = await callback(...args);
      endLoading(id);
      return result;
    },
    [callback, endLoading, startLoading]
  );
};
