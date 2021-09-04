import { Box, BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Deck } from "../types";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";

type Props = { deck: Deck } & BoxProps;

const Component: React.FC<Props> = ({ deck, ...styleProps }) => {
  const router = useRouter();
  const [cards, setCards] = useState([...deck.cards].reverse());
  const initFront = "question";
  const [front, setFront] = useState<"question" | "answer">(initFront);

  const handleTurnOver = () => {
    setFront((front) => {
      return front === "question" ? "answer" : "question";
    });
  };

  const handleCorrect = () => {
    setCards((cards) => cards.filter((_, index) => index !== cards.length - 1));
    setFront("question");
  };

  const handleInCorrect = () => {
    setCards((cards) => cards.filter((_, index) => index !== cards.length - 1));
    setFront("question");
  };

  return (
    <Box width="min-content" {...styleProps}>
      <FlashCardViewer cards={cards} front={front} />
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
