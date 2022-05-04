import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage/DeckPlayerPage";
import { Deck, DeckCard } from "@/models";
import { assertNever } from "@/utils/assertNever";
import { shuffle } from "@/utils/shuffle";
import { Reducer, useMemo, useReducer } from "react";

export type Play = {
  cardStack: DeckCard[];
  rightAnswersCount: number;
  wrongCards: DeckCard[];
  allCardsCount: number;
  progress: number;
  front: "question" | "answer";
};
type DeckPlayerState = {
  initialCards: DeckCard[];
  settings: DeckPlaySettings;
  currentPlay: Play;
};
export type DeckPlayerAction =
  | "turnOver"
  | "right"
  | "wrong"
  | "replayAll"
  | "replayWrong";

type UseDeckPlayerResult = DeckPlayerState & {
  currentTopCard: DeckCard | undefined;
  // 内部でuseReducerを使っているので、dispatchをそのまま返す事も考えたが、
  // 各アクションを実行する関数を返したほうがアクションをラップしやすいと思ったのでこう書いた
  handleTurnOver: () => void;
  handleRight: () => void;
  handleWrong: () => void;
  handleReplayAll: () => void;
  handleReplayWrong: () => void;
};

const buildCardStack = (cards: DeckCard[], isOrderRandom: boolean) => {
  const stack = isOrderRandom ? shuffle(cards) : cards;
  return [...stack].reverse();
};

const reducer: Reducer<DeckPlayerState, DeckPlayerAction> = (state, action) => {
  const { initialCards, settings, currentPlay } = state;
  const { cardStack, allCardsCount, rightAnswersCount, wrongCards, front } =
    currentPlay;

  switch (action) {
    case "turnOver": {
      return {
        ...state,
        currentPlay: {
          ...currentPlay,
          front: front === "question" ? "answer" : "question",
        },
        front: front === "question" ? "answer" : "question",
      };
    }
    case "right": {
      return {
        ...state,
        currentPlay: {
          ...currentPlay,
          cardStack: cardStack.slice(0, -1),
          rightAnswersCount: rightAnswersCount + 1,
          progress:
            ((allCardsCount - (cardStack.length - 1)) / allCardsCount) * 100,
          front: settings.initialFront,
        },
      };
    }
    case "wrong": {
      const wrongCard = cardStack[cardStack.length - 1];
      if (!wrongCard) {
        throw new Error("存在しないカード");
      }

      return {
        ...state,
        currentPlay: {
          ...currentPlay,
          cardStack: cardStack.slice(0, -1),
          wrongCards: [...wrongCards, wrongCard],
          front: settings.initialFront,
          progress:
            ((allCardsCount - (cardStack.length - 1)) / allCardsCount) * 100,
        },
      };
    }
    case "replayAll": {
      return {
        ...state,
        currentPlay: {
          ...currentPlay,
          cardStack: buildCardStack(initialCards, settings.isOrderRandom),
          rightAnswersCount: 0,
          wrongCards: [],
          allCardsCount: initialCards.length,
          front: settings.initialFront,
          progress: 0,
        },
      };
    }
    case "replayWrong": {
      return {
        ...state,
        currentPlay: {
          ...currentPlay,
          cardStack: buildCardStack(wrongCards, settings.isOrderRandom),
          rightAnswersCount: 0,
          wrongCards: [],
          allCardsCount: wrongCards.length,
          front: settings.initialFront,
          progress: 0,
        },
      };
    }
    default: {
      assertNever(action);
    }
  }
};

export const useDeckPlayer = (
  deck: Deck,
  settings: DeckPlaySettings
): UseDeckPlayerResult => {
  const initialState: DeckPlayerState = {
    initialCards: deck.cards,
    settings,
    currentPlay: {
      cardStack: buildCardStack(deck.cards, settings.isOrderRandom),
      allCardsCount: deck.cards.length,
      rightAnswersCount: 0,
      wrongCards: [],
      front: settings.initialFront,
      progress: 0,
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentTopCard = useMemo(() => {
    const { cardStack } = state.currentPlay;
    return cardStack[cardStack.length - 1];
  }, [state.currentPlay]);

  const handleTurnOver = () => {
    dispatch("turnOver");
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
    currentTopCard,
    handleTurnOver,
    handleRight,
    handleWrong,
    handleReplayAll,
    handleReplayWrong,
  };
};
