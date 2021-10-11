import { Box } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../types";
import { FlashCardItem } from "./FlashCardItem";

type Props = {
  cards: FlashCard[];
  topFront: "question" | "answer";
  initialFront: "question" | "answer";
};

const Component: React.FC<Props> = ({ cards, topFront, initialFront }) => {
  return (
    <Box
      position="relative"
      bgColor="gray.600"
      boxShadow="dark-lg"
      w="800px"
      h="500px"
      rounded="3xl"
    >
      {cards.map((card, index) => (
        <FlashCardItem
          key={card.id}
          card={card}
          rounded="3xl"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          margin="auto"
          // 最後のcard(一番全面にあるcard)のfrontのみを変化させる
          front={cards.length - 1 === index ? topFront : initialFront}
        />
      ))}
    </Box>
  );
};

export const FlashCardViewer = Component;
