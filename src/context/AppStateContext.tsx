import { DeckListSideMenuNames } from "@/components/pages/DeckListPage/DeckListPage";
import { ConfirmContextProvider } from "@/context/ConfirmContext";
import { LoadingStateContextProvider } from "@/context/LoadingStateContext";
import React, { createContext, useContext, useState } from "react";

type AppState = {
  menuSelected: DeckListSideMenuNames;
  selectMenu: (menuName: DeckListSideMenuNames) => void;
  sideAreaWidth: number;
  setSideAreaWidth: (w: number) => void;
};
const AppStateContext = createContext<AppState>({
  menuSelected: "none",
  selectMenu: () => {},
  sideAreaWidth: 300,
  setSideAreaWidth: () => {},
});

export const AppStateContextProvider: React.FC = ({ children }) => {
  const [menuSelected, setMenuSelected] =
    useState<DeckListSideMenuNames>("none");
  const [sideAreaWidth, setSideAreaWidth] = useState(300);

  return (
    <AppStateContext.Provider
      value={{
        menuSelected,
        selectMenu: setMenuSelected,
        sideAreaWidth,
        setSideAreaWidth,
      }}
    >
      <LoadingStateContextProvider>
        <ConfirmContextProvider>{children}</ConfirmContextProvider>
      </LoadingStateContextProvider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
