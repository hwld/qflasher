import { Box } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../types";
import { FlashCardItem } from "./FlashCardItem";

type Props = {
  cards: FlashCard[];
  initialFront: "question" | "answer";
  topFront: "question" | "answer";
};

export const FlashCardViewer: React.FC<Props> = ({
  cards,
  initialFront,
  topFront,
}) => {
  return (
    <Box
      position="relative"
      bgColor="gray.600"
      w="800px"
      h="500px"
      rounded="3xl"
    >
      {cards.map((card, index) => (
        <FlashCardItem
          key={card.id}
          initialFront={initialFront}
          card={card}
          front={index === cards.length - 1 ? topFront : initialFront}
        />
      ))}
    </Box>
  );
};
