import { Box, BoxProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { Deck, FlashCard } from "../types";
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

  const [wrongCards, setWrongCards] = useState<FlashCard[]>([]);

  const handleTurnOver = () => {
    setFront((front) => {
      return front === "question" ? "answer" : "question";
    });
  };

  const handleRight = () => {
    setCards((cards) => cards.slice(0, -1));
    setFront(config.initialFront);
  };

  const handleWrong = () => {
    setCards((cards) => cards.slice(0, -1));
    setWrongCards((wrongCards) => [...wrongCards, cards[cards.length - 1]]);
    setFront(config.initialFront);
  };

  const handleReplayAll = () => {
    const cards = config.isOrderRandom
      ? getShuffledArray(deck.cards)
      : deck.cards;
    setCards([...cards].reverse());
    setWrongCards([]);
    setFront(config.initialFront);
  };

  const handleReplayWrong = () => {
    // 間違えたカードをカードにセットする
    const cards = config.isOrderRandom
      ? getShuffledArray(wrongCards)
      : wrongCards;
    setCards([...cards].reverse());
    setWrongCards([]);
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
        onRight={handleRight}
        onWrong={handleWrong}
        onReplayWrong={handleReplayWrong}
        onReplayAll={handleReplayAll}
        justify="center"
      />
    </Box>
  );
};

export const DeckPlayer = Component;
