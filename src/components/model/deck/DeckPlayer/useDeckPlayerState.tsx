import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage";
import { Deck, DeckCard } from "@/models";
import { assertNever } from "@/utils/assertNever";
import { shuffle } from "@/utils/shuffle";
import { Reducer, useReducer } from "react";

type State = {
  initialCards: DeckCard[];
  settings: DeckPlaySettings;
  cardStack: DeckCard[];
  rightAnswerCount: number;
  wrongCards: DeckCard[];
  totalCardsCount: number;
  progress: number;
  front: "question" | "answer";
};
type Action = "trunOver" | "right" | "wrong" | "replayAll" | "replayWrong";

const buildCardStack = (cards: DeckCard[], isOrderRandom: boolean) => {
  const stack = isOrderRandom ? shuffle(cards) : cards;
  return [...stack].reverse();
};

const reducer: Reducer<State, Action> = (state, action) => {
  const {
    initialCards,
    settings,
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
        front: settings.initialFront,
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
        front: settings.initialFront,
      };
    }
    case "replayAll": {
      return {
        ...state,
        cardStack: buildCardStack(initialCards, settings.isOrderRandom),
        rightAnswerCount: 0,
        wrongCards: [],
        totalCardsCount: initialCards.length,
        progress: 0,
        front: settings.initialFront,
      };
    }
    case "replayWrong": {
      return {
        ...state,
        cardStack: buildCardStack(wrongCards, settings.isOrderRandom),
        rightAnswerCount: 0,
        wrongCards: [],
        totalCardsCount: wrongCards.length,
        progress: 0,
        front: settings.initialFront,
      };
    }
    default: {
      assertNever(action);
    }
  }
};

export const useDeckPlayerState = (deck: Deck, settings: DeckPlaySettings) => {
  const [state, dispatch] = useReducer(reducer, {
    initialCards: deck.cards,
    settings,
    cardStack: buildCardStack(deck.cards, settings.isOrderRandom),
    rightAnswerCount: 0,
    wrongCards: [],
    totalCardsCount: deck.cards.length,
    progress: 0,
    front: settings.initialFront,
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
