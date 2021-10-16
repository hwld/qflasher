import { Box } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../types";
import { FlashCardItem } from "./FlashCardItem";
import { Progress } from "./Progress";

type Props = {
  cards: FlashCard[];
  progress: number;
  initialFront: "question" | "answer";
  topFront: "question" | "answer";
};

export const FlashCardViewer: React.FC<Props> = ({
  cards,
  progress,
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
      overflow="hidden"
    >
      {cards.map((card, index) => (
        <FlashCardItem
          key={card.id}
          initialFront={initialFront}
          card={card}
          front={index === cards.length - 1 ? topFront : initialFront}
        />
      ))}
      <Progress
        position="absolute"
        bottom={0}
        w="100%"
        value={progress}
        transition="width 300ms ease"
      />
    </Box>
  );
};
