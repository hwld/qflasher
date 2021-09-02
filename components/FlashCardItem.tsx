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
      w="800px"
      h="500px"
      bgColor="gray.200"
      justify="center"
      align="center"
      padding={7}
      borderRadius="10px"
      {...styleProps}
    >
      <Text fontSize="4xl" fontWeight="bold">
        {front === "question" ? card.question : card.answer}
      </Text>
    </Flex>
  );
};

export const FlashCardItem = Component;
