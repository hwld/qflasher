import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Deck } from "../types";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";

type Props = { deck: Deck };

const Component: React.FC<Props> = ({ deck }) => {
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

  useEffect(() => {
    if (cards.length === 0) {
      router.push("/deckList");
    }
  }, [cards.length, router]);

  return (
    <>
      <FlashCardViewer cards={cards} front={front} />
      <OperationBar
        mt={3}
        onTurnOver={handleTurnOver}
        onCorrect={handleCorrect}
        onIncorrect={handleInCorrect}
      />
    </>
  );
};

export const DeckPlayer = Component;
