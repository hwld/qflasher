import { AppPageLoading } from "@/components/ui/AppPageLoading";
import { Header } from "@/components/ui/Header/Header";
import { useLoadingState } from "@/context/LoadingStateContext";
import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";

type Props = { children: ReactNode; isSignInButtonHidden?: boolean };

export const AppTemplate: React.FC<Props> = ({
  children,
  isSignInButtonHidden,
}) => {
  const { isLoading } = useLoadingState();
  const size =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // 100vhにするとスマホのツールバーの高さを含まず、その分下にはみ出してしまう
  useEffect(() => {
    const handler = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    return () => {
      window.removeEventListener("reset", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);

  return (
    <>
      <AppPageLoading />
      <Grid
        templateRows="auto 1fr"
        h={`${screenHeight}px`}
        overflow="hidden"
        bgImage="url('/background.svg')"
        bgPosition="center"
        bgSize="cover"
      >
        <Header
          loading={isLoading}
          size={size}
          isSignInButtonHidden={isSignInButtonHidden}
        />
        <Box overflow="auto">{children}</Box>
      </Grid>
    </>
  );
};
