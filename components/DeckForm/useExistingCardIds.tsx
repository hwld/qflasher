import { useCallback, useMemo } from "react";
import { FormFlashCardId } from ".";

export const useExistingCardIds = (cardIds: FormFlashCardId[]) => {
  const existingCardIds = useMemo(() => {
    return cardIds.filter((id) => !id.deleted).map((id) => id.value);
  }, [cardIds]);

  const isFirstCard = useCallback(
    (cardId: string) => {
      const cardIndex = existingCardIds.findIndex((id) => id === cardId);
      return cardIndex === 0;
    },
    [existingCardIds]
  );

  const isLastCard = useCallback(
    (cardId: string) => {
      const cardIndex = existingCardIds.findIndex((id) => id === cardId);
      return cardIndex === existingCardIds.length - 1;
    },
    [existingCardIds]
  );

  const firstCardId = useCallback(() => {
    return existingCardIds[0];
  }, [existingCardIds]);

  const prevCardId = useCallback(
    (cardId: string) => {
      const cardIndex = existingCardIds.findIndex((id) => id === cardId);
      return existingCardIds[cardIndex - 1];
    },
    [existingCardIds]
  );

  const nextCardId = useCallback(
    (cardId: string) => {
      const cardIndex = existingCardIds.findIndex((id) => id === cardId);
      return existingCardIds[cardIndex + 1];
    },
    [existingCardIds]
  );

  const lastCardId = useCallback(() => {
    return existingCardIds[existingCardIds.length - 1];
  }, [existingCardIds]);

  return {
    existingCardIds,
    isFirstCard,
    isLastCard,
    firstCardId,
    prevCardId,
    nextCardId,
    lastCardId,
  };
};
