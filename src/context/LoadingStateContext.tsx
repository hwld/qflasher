import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

type LoadingState = { isLoading: boolean };
type LoadingStateAction = {
  startLoading: () => string;
  endLoading: (id: string) => void;
};

const LoadingStateContext = createContext<LoadingState>({ isLoading: false });
const LoadingStateActionContext = createContext<LoadingStateAction>({
  startLoading: () => "",
  endLoading: () => {},
});

export const LoadingStateContextProvider: React.FC = ({ children }) => {
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
      <LoadingStateActionContext.Provider value={{ startLoading, endLoading }}>
        {children}
      </LoadingStateActionContext.Provider>
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => useContext(LoadingStateContext);
export const useLoadingStateAction = () =>
  useContext(LoadingStateActionContext);

export const useWithLoading = <_, T>(callback: (arg: T) => Promise<void>) => {
  const { startLoading, endLoading } = useLoadingStateAction();

  return useCallback(
    async (arg: T) => {
      let id = startLoading();
      await callback(arg);
      endLoading(id);
    },
    [callback, endLoading, startLoading]
  );
};
