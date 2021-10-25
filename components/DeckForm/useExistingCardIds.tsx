import { useCallback, useMemo } from "react";

export const useExistingCardIds = (
  cards: { id: string; deleted: boolean }[]
) => {
  const existingCards = useMemo(() => {
    return cards
      .filter((c) => !c.deleted)
      .map((c) => ({
        id: c.id,
      }));
  }, [cards]);

  const isFirstCard = useCallback(
    (cardId: string) => {
      const cardIndex = existingCards.findIndex((c) => c.id === cardId);
      return cardIndex === 0;
    },
    [existingCards]
  );

  const isLastCard = useCallback(
    (cardId: string) => {
      const cardIndex = existingCards.findIndex((c) => c.id === cardId);
      return cardIndex === existingCards.length - 1;
    },
    [existingCards]
  );

  const firstCardId = useCallback(() => {
    return existingCards[0].id;
  }, [existingCards]);

  const prevCardId = useCallback(
    (cardId: string) => {
      const cardIndex = existingCards.findIndex((c) => c.id === cardId);
      return existingCards[cardIndex - 1].id;
    },
    [existingCards]
  );

  const nextCardId = useCallback(
    (cardId: string) => {
      const cardIndex = existingCards.findIndex((c) => c.id === cardId);
      return existingCards[cardIndex + 1].id;
    },
    [existingCards]
  );

  const lastCardId = useCallback(() => {
    return existingCards[existingCards.length - 1].id;
  }, [existingCards]);

  return {
    existingCards,
    isFirstCard,
    isLastCard,
    firstCardId,
    prevCardId,
    nextCardId,
    lastCardId,
  };
};
