import { DeckPlayConfig } from "@/components/pages/DeckPlayerPage";
import { Deck, FlashCard } from "@/types";
import { assertNever } from "@/utils/assertNever";
import { shuffle } from "@/utils/shuffle";
import { Reducer, useReducer } from "react";

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

const buildCardStack = (cards: FlashCard[], isOrderRandom: boolean) => {
  const stack = isOrderRandom ? shuffle(cards) : cards;
  return [...stack].reverse();
};

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

export const useDeckPlayerState = (deck: Deck, config: DeckPlayConfig) => {
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

  return {
    ...state,
    handleTurnOver,
    handleRight,
    handleWrong,
    handleReplayAll,
    handleReplayWrong,
  };
};
