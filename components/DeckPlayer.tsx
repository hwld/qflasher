import { Box, BoxProps } from "@chakra-ui/react";
import React, { Reducer, useReducer } from "react";
import { Deck, FlashCard } from "../types";
import { assertNever } from "../utils/assertNever";
import { getShuffledArray } from "../utils/getShuffledArray";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";
import { DeckPlayConfig } from "./pages/deckPlayer/DeckPlayerPage";

type Props = {
  deck: Deck;
  config: DeckPlayConfig;
} & BoxProps;

type Status = {
  initialCards: FlashCard[];
  config: DeckPlayConfig;
  cardStack: FlashCard[];
  wrongCards: FlashCard[];
  front: "question" | "answer";
};
type Action = "trunOver" | "right" | "wrong" | "replayAll" | "replayWrong";

const reducer: Reducer<Status, Action> = (state, action) => {
  const { initialCards, config, cardStack, wrongCards, front } = state;
  switch (action) {
    case "trunOver": {
      return {
        ...state,
        front: front === "question" ? "answer" : "question",
      };
    }
    case "right": {
      return {
        ...state,
        cardStack: cardStack.slice(0, -1),
        front: config.initialFront,
      };
    }
    case "wrong": {
      return {
        ...state,
        wrongCards: [...wrongCards, cardStack[cardStack.length - 1]],
        cardStack: cardStack.slice(0, -1),
        front: config.initialFront,
      };
    }
    case "replayAll": {
      return {
        ...state,
        cardStack: buildCardStack(initialCards, config.isOrderRandom),
        wrongCards: [],
        front: config.initialFront,
      };
    }
    case "replayWrong": {
      return {
        ...state,
        cardStack: buildCardStack(wrongCards, config.isOrderRandom),
        wrongCards: [],
        front: config.initialFront,
      };
    }
    default: {
      assertNever(action);
    }
  }
};

const buildCardStack = (cards: FlashCard[], isOrderRandom: boolean) => {
  const stack = isOrderRandom ? getShuffledArray(cards) : cards;
  return [...stack].reverse();
};

const Component: React.FC<Props> = ({ deck, config, ...styleProps }) => {
  const [status, dispatch] = useReducer(reducer, {
    initialCards: deck.cards,
    config,
    cardStack: buildCardStack(deck.cards, config.isOrderRandom),
    wrongCards: [],
    front: config.initialFront,
  });

  const handleTurnOver = () => {
    dispatch("trunOver");
  };

  const handleRight = () => {
    dispatch("right");
  };

  const handleWrong = () => {
    dispatch("wrong");
  };

  const handleReplayAll = () => {
    dispatch("replayAll");
  };

  const handleReplayWrong = () => {
    dispatch("replayWrong");
  };

  return (
    <Box width="min-content" {...styleProps}>
      <FlashCardViewer
        cards={status.cardStack}
        initialFront={config.initialFront}
        topFront={status.front}
      />
      <OperationBar
        mt={3}
        isEnd={status.cardStack.length === 0}
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
