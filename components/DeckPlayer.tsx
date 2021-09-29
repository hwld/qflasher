import { Box, BoxProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { Deck } from "../types";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";

type Props = { deck: Deck; initialFront: "question" | "answer" } & BoxProps;

const Component: React.FC<Props> = ({ deck, initialFront, ...styleProps }) => {
  const [cards, setCards] = useState([...deck.cards].reverse());
  const [front, setFront] = useState<"question" | "answer">(initialFront);

  const handleTurnOver = () => {
    setFront((front) => {
      return front === "question" ? "answer" : "question";
    });
  };

  const handleCorrect = () => {
    setCards((cards) => cards.filter((_, index) => index !== cards.length - 1));
    setFront(initialFront);
  };

  const handleInCorrect = () => {
    setCards((cards) => cards.filter((_, index) => index !== cards.length - 1));
    setFront(initialFront);
  };

  return (
    <Box width="min-content" {...styleProps}>
      <FlashCardViewer
        cards={cards}
        topFront={front}
        initialFront={initialFront}
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
