import { DeckListSideMenuNames } from "@/components/pages/DeckListPage/DeckListPage";
import { ConfirmContextProvider } from "@/context/ConfirmContext";
import { LoadingStateContextProvider } from "@/context/LoadingStateContext";
import React, { createContext, useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      <DndProvider backend={HTML5Backend}>
        <LoadingStateContextProvider>
          <ConfirmContextProvider>{children}</ConfirmContextProvider>
        </LoadingStateContextProvider>
      </DndProvider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
