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
      justify="center"
      align="center"
      padding={7}
      overflowY="auto"
      {...styleProps}
    >
      <Text
        fontSize="4xl"
        fontWeight="bold"
        wordBreak="break-all"
        textAlign="center"
      >
        {front === "question" ? card.question : card.answer}
      </Text>
    </Flex>
  );
};

export const FlashCardItem = Component;
