import { AnimationEvent } from "@/components/model/deck/DeckPlayer/DeckPlayer";
import { DeckCardStackItem } from "@/components/model/deckCard/DeckCardStackItem/DeckCardStackItem";
import { ResultItem } from "@/components/model/deckCard/DeckCardStackItem/ResultItem";
import { AppProgress } from "@/components/ui/AppProgress";
import { DeckCard } from "@/models";
import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  size: "sm" | "md";
  totalCardsCount: number;
  rightAnswersCount: number;
  cards: DeckCard[];
  progress: number;
  initialFront: "question" | "answer";
  topFront: "question" | "answer";
  animationEvents: AnimationEvent[];
  onRemoveEvent: (id: string) => void;
} & Omit<BoxProps, "size">;

export const DeckCardStack: React.FC<Props> = ({
  size,
  totalCardsCount,
  rightAnswersCount,
  cards,
  progress,
  initialFront,
  topFront,
  animationEvents,
  onRemoveEvent,
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
      zIndex={1}
      {...styles}
    >
      {cards.length !== 0 ? (
        cards
          .slice(-2)
          .map((card) => (
            <DeckCardStackItem
              size={size}
              key={card.id}
              initialFront={initialFront}
              card={card}
              front={isTopCard(card.id) ? topFront : initialFront}
              isBackground={isTopCard(card.id) ? false : true}
              animationEvent={animationEvents.find((e) => e.cardId === card.id)}
              onRemoveEvent={onRemoveEvent}
            />
          ))
      ) : (
        <ResultItem
          size={size}
          totalCardsCount={totalCardsCount}
          rightAnswersCount={rightAnswersCount}
        />
      )}
      <AppProgress
        position="absolute"
        bottom={0}
        w="100%"
        value={progress}
        transition="width 300ms ease"
      />
    </Box>
  );
};
