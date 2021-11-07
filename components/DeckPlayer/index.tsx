import { Flex, FlexProps } from "@chakra-ui/react";
import React, { Reducer, useReducer } from "react";
import { Deck, FlashCard } from "../../types";
import { assertNever } from "../../utils/assertNever";
import { shuffle } from "../../utils/shuffle";
import { DeckPlayConfig } from "../pages/DeckPlayerPage";
import { FlashCardViewer } from "./FlashCardViewer";
import { OperationBar } from "./OperationBar";

type Props = {
  deck: Deck;
  config: DeckPlayConfig;
  size: "sm" | "md";
} & FlexProps;

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
      const wrongCard = cardStack[cardStack.length - 1];
      if (!wrongCard) {
        throw new Error("存在しないカード");
      }

      return {
        ...state,
        wrongCards: [...wrongCards, wrongCard],
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
  const stack = isOrderRandom ? shuffle(cards) : cards;
  return [...stack].reverse();
};

export const DeckPlayer: React.FC<Props> = ({
  deck,
  config,
  size,
  ...styles
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
    <Flex direction="column" {...styles}>
      <FlashCardViewer
        maxW="800px"
        w="100%"
        mx="auto"
        flexGrow={1}
        size={size}
        initialFront={config.initialFront}
        totalCardsCount={state.totalCardsCount}
        rightAnswersCount={state.rightAnswerCount}
        cards={state.cardStack}
        progress={state.progress}
        topFront={state.front}
      />
      <OperationBar
        my={5}
        size={size}
        isEnd={state.cardStack.length === 0}
        wrongAnswerCount={state.wrongCards.length}
        onTurnOver={handleTurnOver}
        onRight={handleRight}
        onWrong={handleWrong}
        onReplayWrong={handleReplayWrong}
        onReplayAll={handleReplayAll}
        justify="center"
      />
    </Flex>
  );
};
