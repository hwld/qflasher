import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../types";

type Props = {
  card: FlashCard;
  front: "question" | "answer";
} & FlexProps;

const Component: React.FC<Props> = ({ card, front, ...styleProps }) => {
  return (
    <Flex
      bgColor="gray.700"
      flexDir="column"
      justify="center"
      align="center"
      padding={7}
      overflowY="auto"
      {...styleProps}
    >
      <Flex flex="auto" justify="center" align="center" w="100%">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          wordBreak="break-all"
          textAlign="center"
        >
          {front === "question" ? card.question : card.answer}
        </Text>
      </Flex>
      <Flex w="100%">
        <Text color="gray.300">{front === "question" ? "質問" : "答え"}</Text>
      </Flex>
    </Flex>
  );
};

export const FlashCardItem = Component;
