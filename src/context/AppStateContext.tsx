import React from "react";
import { ConfirmContextProvider } from "./ConfirmContext";
import { LoadingStateContextProvider } from "./LoadingStateContext";

export const AppStateContextProvider: React.FC = ({ children }) => {
  return (
    <LoadingStateContextProvider>
      <ConfirmContextProvider>{children}</ConfirmContextProvider>
    </LoadingStateContextProvider>
  );
};
