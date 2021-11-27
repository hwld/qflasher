import { TextProps } from "@chakra-ui/react";

export type deckCardStyle = {
  ringWidth: number;
  cardWidth: number;
  height: number;
  nameFontSize: TextProps["fontSize"];
  metaFontSize: TextProps["fontSize"];
};

export const useDeckCardStyle = (size: "sm" | "md"): deckCardStyle => {
  let ringWidth;
  let cardWidth;
  let height;
  let nameFontSize: TextProps["fontSize"];
  let metaFontSize: TextProps["fontSize"];

  switch (size) {
    case "sm": {
      ringWidth = 25;
      cardWidth = 275;
      height = 145;
      nameFontSize = "sm";
      metaFontSize = "xs";
      break;
    }
    case "md": {
      ringWidth = 50;
      cardWidth = 300;
      height = 185;
      nameFontSize = "md";
      metaFontSize = "sm";
      break;
    }
  }

  return { ringWidth, cardWidth, height, nameFontSize, metaFontSize };
};
