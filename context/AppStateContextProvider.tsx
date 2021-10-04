import React, { useContext, useState } from "react";

type AppState = { isLoading: boolean };
type SetAppState = { setIsLoading: (value: boolean) => void };

const AppStateContext = React.createContext<AppState>({
  isLoading: true,
});
const SetAppStateContext = React.createContext<SetAppState>({
  setIsLoading: () => {},
});

export const AppStateContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppStateContext.Provider value={{ isLoading }}>
      <SetAppStateContext.Provider value={{ setIsLoading }}>
        {children}
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useSetAppState = () => useContext(SetAppStateContext);
