import { Box, Center, Text, TextProps } from "@chakra-ui/layout";
import React from "react";

type Props = {
  size: "sm" | "md";
  totalCardsCount: number;
  rightAnswersCount: number;
};

export const ResultItem: React.FC<Props> = ({
  size,
  totalCardsCount,
  rightAnswersCount,
}) => {
  let resultFontSize: TextProps["fontSize"];
  let textFontSize: TextProps["fontSize"];
  switch (size) {
    case "sm": {
      resultFontSize = "3xl";
      textFontSize = "xl";
      break;
    }
    case "md": {
      resultFontSize = "6xl";
      textFontSize = "3xl";
      break;
    }
  }

  return (
    <Center boxSize="100%">
      <Box>
        <Text
          fontSize={resultFontSize}
          textAlign="center"
        >{`${rightAnswersCount} / ${totalCardsCount}`}</Text>
        <Text fontSize={textFontSize} textAlign="center">
          正解数
        </Text>
      </Box>
    </Center>
  );
};
