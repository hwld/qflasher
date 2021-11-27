import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useAppState } from "../../../context/AppStateContextProvider";
import { Header } from "./Header";

export const AppTemplate: React.FC = ({ children }) => {
  const { isLoading } = useAppState();
  const size =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  return (
    <Grid templateRows="auto 1fr" h="100vh" overflow="hidden">
      <Header isLoading={isLoading} size={size} />
      <Box overflow="auto">{children}</Box>
    </Grid>
  );
};