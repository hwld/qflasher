import React, { useCallback, useContext, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

type AppState = { isLoading: boolean };
type SetAppState = {
  startLoading: () => string;
  endLoading: (id: string) => void;
};

const AppStateContext = React.createContext<AppState>({
  isLoading: false,
});
const SetAppStateContext = React.createContext<SetAppState>({
  startLoading: () => "",
  endLoading: () => {},
});

export const AppStateContextProvider: React.FC = ({ children }) => {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const isLoading = useMemo(() => {
    return loadingIds.length !== 0;
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
    <AppStateContext.Provider value={{ isLoading }}>
      <SetAppStateContext.Provider value={{ startLoading, endLoading }}>
        {children}
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useSetAppState = () => useContext(SetAppStateContext);
