import { Box, BoxProps } from "@chakra-ui/react";
import React, { Reducer, useReducer } from "react";
import { Deck, FlashCard } from "../../types";
import { assertNever } from "../../utils/assertNever";
import { getShuffledArray } from "../../utils/getShuffledArray";
import { DeckPlayConfig } from "../pages/DeckPlayerPage";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";

type Props = {
  deck: Deck;
  config: DeckPlayConfig;
} & BoxProps;

type State = {
  initialCards: FlashCard[];
  config: DeckPlayConfig;
  cardStack: FlashCard[];
  rightAnswerCount: number;
  wrongCards: FlashCard[];
  totalCardsCount: number;
  progress: number;
  front: "question" | "answer";
};
type Action = "trunOver" | "right" | "wrong" | "replayAll" | "replayWrong";

const reducer: Reducer<State, Action> = (state, action) => {
  const {
    initialCards,
    config,
    cardStack,
    rightAnswerCount,
    wrongCards,
    totalCardsCount,
    front,
  } = state;

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
        rightAnswerCount: rightAnswerCount + 1,
        cardStack: cardStack.slice(0, -1),
        progress:
          ((totalCardsCount - (cardStack.length - 1)) / totalCardsCount) * 100,
        front: config.initialFront,
      };
    }
    case "wrong": {
      return {
        ...state,
        wrongCards: [...wrongCards, cardStack[cardStack.length - 1]],
        cardStack: cardStack.slice(0, -1),
        progress:
          ((totalCardsCount - (cardStack.length - 1)) / totalCardsCount) * 100,
        front: config.initialFront,
      };
    }
    case "replayAll": {
      return {
        ...state,
        cardStack: buildCardStack(initialCards, config.isOrderRandom),
        rightAnswerCount: 0,
        wrongCards: [],
        totalCardsCount: initialCards.length,
        progress: 0,
        front: config.initialFront,
      };
    }
    case "replayWrong": {
      return {
        ...state,
        cardStack: buildCardStack(wrongCards, config.isOrderRandom),
        rightAnswerCount: 0,
        wrongCards: [],
        totalCardsCount: wrongCards.length,
        progress: 0,
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

export const DeckPlayer: React.FC<Props> = ({
  deck,
  config,
  ...styleProps
}) => {
  const [state, dispatch] = useReducer(reducer, {
    initialCards: deck.cards,
    config,
    cardStack: buildCardStack(deck.cards, config.isOrderRandom),
    rightAnswerCount: 0,
    wrongCards: [],
    totalCardsCount: deck.cards.length,
    progress: 0,
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
        totalCardsCount={state.totalCardsCount}
        rightAnswersCount={state.rightAnswerCount}
        cards={state.cardStack}
        progress={state.progress}
        initialFront={config.initialFront}
        topFront={state.front}
      />
      <OperationBar
        mt={3}
        isEnd={state.cardStack.length === 0}
        wrongAnswerCount={state.wrongCards.length}
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
