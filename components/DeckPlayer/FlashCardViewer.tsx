import { Box } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../../types";
import { FlashCardItem } from "./FlashCardItem";
import { Progress } from "../Progress";
import { ResultItem } from "./ResultItem";

type Props = {
  totalCardsCount: number;
  rightAnswersCount: number;
  cards: FlashCard[];
  progress: number;
  initialFront: "question" | "answer";
  topFront: "question" | "answer";
};

export const FlashCardViewer: React.FC<Props> = ({
  totalCardsCount,
  rightAnswersCount,
  cards,
  progress,
  initialFront,
  topFront,
}) => {
  return (
    <Box
      position="relative"
      bgColor="gray.700"
      w="800px"
      h="500px"
      rounded="3xl"
      overflow="hidden"
    >
      {cards.length !== 0 ? (
        cards.map((card, index) => (
          <FlashCardItem
            key={card.id}
            initialFront={initialFront}
            card={card}
            front={index === cards.length - 1 ? topFront : initialFront}
            isBackground={index === cards.length - 1 ? false : true}
          />
        ))
      ) : (
        <ResultItem
          totalCardsCount={totalCardsCount}
          rightAnswersCount={rightAnswersCount}
        />
      )}
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
