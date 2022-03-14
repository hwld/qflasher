import { ConfirmProvider } from "@/context/ConfirmContext";
import { HeaderStateProvider } from "@/context/HeaderContext";
import { LoadingProvider } from "@/context/LoadingStateContext";
import { SideMenuProvider } from "@/context/SideMenuContext";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const AppStateProvider: React.FC = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LoadingProvider>
        <ConfirmProvider>
          <HeaderStateProvider>
            <SideMenuProvider>{children}</SideMenuProvider>
          </HeaderStateProvider>
        </ConfirmProvider>
      </LoadingProvider>
    </DndProvider>
  );
};
