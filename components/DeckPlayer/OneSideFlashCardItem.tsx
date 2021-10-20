import { Flex, FlexProps, Text } from "@chakra-ui/layout";
import React from "react";

type Props = {
  text: string;
  type: "question" | "answer";
  isBackground?: boolean;
} & FlexProps;

export const OneSideFlashCardItem: React.FC<Props> = ({
  text,
  type,
  isBackground,
  ...styleProps
}) => {
  return (
    <Flex
      position="absolute"
      boxSize="100%"
      boxShadow="dark-lg"
      bgColor="gray.700"
      flexDir="column"
      justify="center"
      align="center"
      padding={7}
      overflowY="auto"
      style={{ backfaceVisibility: "hidden" }}
      {...styleProps}
    >
      <Flex flex="auto" justify="center" align="center" w="100%">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          wordBreak="break-all"
          textAlign="center"
          opacity={isBackground ? 0.2 : 1}
        >
          {text}
        </Text>
      </Flex>
      <Flex w="100%">
        <Text color="gray.300" opacity={isBackground ? 0.2 : 1}>
          {type === "question" ? "質問" : "答え"}
        </Text>
      </Flex>
    </Flex>
  );
};
