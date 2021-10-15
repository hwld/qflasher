import { Flex, FlexProps, Text } from "@chakra-ui/layout";
import React from "react";

type Props = { text: string; type: "question" | "answer" } & FlexProps;

export const OneSideFlashCardItem: React.FC<Props> = ({
  text,
  type,
  ...styleProps
}) => {
  return (
    <Flex
      position="absolute"
      boxSize="100%"
      boxShadow="dark-lg"
      rounded="3xl"
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
        >
          {text}
        </Text>
      </Flex>
      <Flex w="100%">
        <Text color="gray.300">{type === "question" ? "質問" : "答え"}</Text>
      </Flex>
    </Flex>
  );
};
