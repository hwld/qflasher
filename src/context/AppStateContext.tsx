import React from "react";
import { LoadingStateContextProvider } from "./LoadingStateContext";

export const AppStateContextProvider: React.FC = ({ children }) => {
  return <LoadingStateContextProvider>{children}</LoadingStateContextProvider>;
};
