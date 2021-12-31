import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useLoadingState } from "../../context/LoadingStateContext";
import { Header } from "./Header/Header";

export const AppTemplate: React.FC = ({ children }) => {
  const { isLoading } = useLoadingState();
  const size =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  return (
    <Grid
      templateRows="auto 1fr"
      h="100vh"
      overflow="hidden"
      bgImage="url('/background.svg')"
      bgPosition="center"
      bgSize="cover"
    >
      <Header isLoading={isLoading} size={size} />
      <Box overflow="auto">{children}</Box>
    </Grid>
  );
};
