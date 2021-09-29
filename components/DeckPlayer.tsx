import { Box, BoxProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { Deck } from "../types";
import { getShuffledArray } from "../utils/getShuffledArray";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";
import { DeckPlayConfig } from "./pages/deckPlayer/DeckPlayerPage";

type Props = {
  deck: Deck;
  config: DeckPlayConfig;
} & BoxProps;

const Component: React.FC<Props> = ({ deck, config, ...styleProps }) => {
  const [cards, setCards] = useState(() => {
    const cards = config.isOrderRandom
      ? getShuffledArray(deck.cards)
      : [...deck.cards];
    return cards.reverse();
  });
  const [front, setFront] = useState<"question" | "answer">(
    config.initialFront
  );

  const handleTurnOver = () => {
    setFront((front) => {
      return front === "question" ? "answer" : "question";
    });
  };

  const handleCorrect = () => {
    setCards((cards) => cards.filter((_, index) => index !== cards.length - 1));
    setFront(config.initialFront);
  };

  const handleInCorrect = () => {
    setCards((cards) => cards.filter((_, index) => index !== cards.length - 1));
    setFront(config.initialFront);
  };

  return (
    <Box width="min-content" {...styleProps}>
      <FlashCardViewer
        cards={cards}
        topFront={front}
        initialFront={config.initialFront}
      />
      <OperationBar
        mt={3}
        isEnd={cards.length === 0}
        onTurnOver={handleTurnOver}
        onCorrect={handleCorrect}
        onIncorrect={handleInCorrect}
        justify="center"
      />
    </Box>
  );
};

export const DeckPlayer = Component;
