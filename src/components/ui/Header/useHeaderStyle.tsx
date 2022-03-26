import { useBreakpointValue } from "@chakra-ui/react";

type HeaderStyle = {
  barHeight: number;
  progressHeight: number;
  logoWidth: number;
  accountIconSize: number;
  formSize: string | undefined;
  signInButtonSize: string | undefined;
};
export const useHeaderStyle = (size: "sm" | "md"): HeaderStyle => {
  const formSize = useBreakpointValue({ base: "xs", md: "md" } as const);
  const signInButtonSize = useBreakpointValue({
    base: "sm",
    md: "md",
  } as const);

  let barHeight;
  let progressHeight;
  let logoWidth;
  let accountIconSize;

  switch (size) {
    case "sm": {
      barHeight = 40;
      progressHeight = 3;
      logoWidth = 150;
      accountIconSize = 30;
      break;
    }
    case "md": {
      barHeight = 60;
      progressHeight = 5;
      logoWidth = 250;
      accountIconSize = 40;
      break;
    }
  }

  return {
    barHeight,
    progressHeight,
    logoWidth,
    accountIconSize,
    formSize,
    signInButtonSize,
  };
};
