import { Box } from "@chakra-ui/react";
import React from "react";
import { useAppState } from "../../../context/AppStateContextProvider";
import { Header } from "./Header";

export const PageTemplate: React.FC = ({ children }) => {
  const { isLoading } = useAppState();
  return (
    <Box minH="100vh">
      <Header isLoading={isLoading} />
      {children}
    </Box>
  );
};
