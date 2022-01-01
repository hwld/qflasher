import { reorder } from "@/utils/reorder";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

export const useCardIds = (initialIds: string[]) => {
  const [cardIds, setCardIds] = useState(initialIds);

  const addCardId = useCallback(():
    | { type: "error"; message: string }
    | { type: "success"; id: string } => {
    if (cardIds.length >= 100) {
      return {
        type: "error",
        message: "カードは100枚までしか作れません。",
      };
    }

    const id = uuid();
    setCardIds((ids) => [...ids, id]);
    return { type: "success", id };
  }, [cardIds.length]);

  const deleteCardId = useCallback((targetId: string) => {
    setCardIds((ids) => ids.filter((id) => id !== targetId));
  }, []);

  const reorderCardIds = useCallback(
    (startIndex: number, endIndex: number) => {
      const ids = reorder(cardIds, startIndex, endIndex);
      setCardIds(ids);
    },
    [cardIds]
  );

  const isFirstCard = useCallback(
    (cardId: string): boolean => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      return cardIndex === 0;
    },
    [cardIds]
  );

  const isLastCard = useCallback(
    (cardId: string): boolean => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      return cardIndex === cardIds.length - 1;
    },
    [cardIds]
  );

  const firstCardId = useCallback((): string => {
    const id = cardIds[0];
    if (!id) {
      throw new Error("cardIdが存在しません");
    }

    return id;
  }, [cardIds]);

  const prevCardId = useCallback(
    (cardId: string): string => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      const id = cardIds[cardIndex - 1];
      if (!id) {
        throw new Error("cardIdが存在しません");
      }
      return id;
    },
    [cardIds]
  );

  const nextCardId = useCallback(
    (cardId: string): string => {
      const cardIndex = cardIds.findIndex((id) => id === cardId);
      const id = cardIds[cardIndex + 1];
      if (!id) {
        throw new Error("cardIdが存在しません");
      }
      return id;
    },
    [cardIds]
  );

  const lastCardId = useCallback((): string => {
    const id = cardIds[cardIds.length - 1];
    if (!id) {
      throw new Error("cardIdが存在しません");
    }
    return id;
  }, [cardIds]);

  return {
    cardIds,
    addCardId,
    deleteCardId,
    reorderCardIds,
    isFirstCard,
    isLastCard,
    firstCardId,
    prevCardId,
    nextCardId,
    lastCardId,
  };
};
