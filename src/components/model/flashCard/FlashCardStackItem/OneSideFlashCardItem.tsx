import { Flex, FlexProps, Text, TextProps } from "@chakra-ui/layout";
import React from "react";

type Props = {
  size: "sm" | "md";
  text: string;
  type: "question" | "answer";
  isBackground?: boolean;
} & FlexProps;

export const OneSideFlashCardItem: React.FC<Props> = ({
  size,
  text,
  type,
  isBackground,
  ...styleProps
}) => {
  let padding;
  let fontSize: TextProps["fontSize"];
  let metaFontSize: TextProps["fontSize"];
  switch (size) {
    case "sm": {
      padding = 4;
      fontSize = "2xl";
      metaFontSize = "sm";
      break;
    }
    case "md": {
      padding = 7;
      fontSize = "4xl";
      metaFontSize = "md";
      break;
    }
  }

  return (
    <Flex
      position="absolute"
      boxSize="100%"
      boxShadow="dark-lg"
      flexDir="column"
      justify="center"
      align="center"
      p={padding}
      overflowY="auto"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      {...styleProps}
    >
      <Flex flex="auto" justify="center" align="center" w="100%">
        <Text
          fontSize={fontSize}
          fontWeight="bold"
          wordBreak="break-all"
          textAlign="center"
          opacity={isBackground ? 0 : 1}
        >
          {text}
        </Text>
      </Flex>
      <Flex w="100%">
        <Text
          color="gray.300"
          opacity={isBackground ? 0 : 1}
          fontSize={metaFontSize}
        >
          {type === "question" ? "質問" : "答え"}
        </Text>
      </Flex>
    </Flex>
  );
};
