import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../../types";
import { Progress } from "../Progress";
import { FlashCardItem } from "./FlashCardItem";
import { ResultItem } from "./ResultItem";

type Props = {
  size: "sm" | "md";
  totalCardsCount: number;
  rightAnswersCount: number;
  cards: FlashCard[];
  progress: number;
  initialFront: "question" | "answer";
  topFront: "question" | "answer";
} & Omit<BoxProps, "size">;

export const FlashCardViewer: React.FC<Props> = ({
  size,
  totalCardsCount,
  rightAnswersCount,
  cards,
  progress,
  initialFront,
  topFront,
  ...styles
}) => {
  const isTopCard = (id: string) => {
    const lastCardId = cards[cards.length - 1]?.id;
    if (!lastCardId) {
      return false;
    }
    return id === lastCardId;
  };

  return (
    <Box
      position="relative"
      bgColor="gray.700"
      rounded="3xl"
      overflow="hidden"
      {...styles}
    >
      {cards.length !== 0 ? (
        cards
          .slice(-2)
          .map((card) => (
            <FlashCardItem
              size={size}
              key={card.id}
              initialFront={initialFront}
              card={card}
              front={isTopCard(card.id) ? topFront : initialFront}
              isBackground={isTopCard(card.id) ? false : true}
            />
          ))
      ) : (
        <ResultItem
          size={size}
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
