import { Header } from "@/components/ui/Header";
import { useLoadingState } from "@/context/LoadingStateContext";
import { usePageLoading } from "@/hooks/usePageLoading";
import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const AppTemplate: React.FC = ({ children }) => {
  const { isLoading } = useLoadingState();
  const size =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";

  usePageLoading();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // 100vhにするとスマホのツールバーの高さを含まず、その分下にはみ出してしまう
  useEffect(() => {
    const handler = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("reset", handler);
    };
  }, []);

  return (
    <Grid
      templateRows="auto 1fr"
      h={`${screenHeight}px`}
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
