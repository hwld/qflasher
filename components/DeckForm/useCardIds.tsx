import { useCallback, useState } from "react";

export const useCardIds = (initialIds: string[]) => {
  const [cardIds, setCardIds] = useState(initialIds);

  const isFirstCard = useCallback(
    (cardId: string) => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      return cardIndex === 0;
    },
    [cardIds]
  );

  const isLastCard = useCallback(
    (cardId: string) => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      return cardIndex === cardIds.length - 1;
    },
    [cardIds]
  );

  const firstCardId = useCallback(() => {
    return cardIds[0];
  }, [cardIds]);

  const prevCardId = useCallback(
    (cardId: string) => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      return cardIds[cardIndex - 1];
    },
    [cardIds]
  );

  const nextCardId = useCallback(
    (cardId: string) => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      return cardIds[cardIndex + 1];
    },
    [cardIds]
  );

  const lastCardId = useCallback(() => {
    return cardIds[cardIds.length - 1];
  }, [cardIds]);

  return {
    cardIds,
    setCardIds,
    isFirstCard,
    isLastCard,
    firstCardId,
    prevCardId,
    nextCardId,
    lastCardId,
  };
};
