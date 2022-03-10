import { LayoutProps, TypographyProps } from "@chakra-ui/react";

export type DeckCardStyle = ReturnType<typeof useDeckCardStyle>;

export const useDeckCardStyle = (size: "sm" | "md") => {
  let ringWidth: number;
  let cardWidth: number;
  let height: number;
  let nameFontSize: TypographyProps["fontSize"];
  let metaFontSize: TypographyProps["fontSize"];
  let playButtonSize: LayoutProps["boxSize"];

  ringWidth = 25;
  cardWidth = 275;
  height = 145;
  nameFontSize = "md";
  metaFontSize = "sm";
  playButtonSize = "40px";

  return {
    ringWidth,
    cardWidth,
    height,
    nameFontSize,
    metaFontSize,
    playButtonSize,
  };
};
