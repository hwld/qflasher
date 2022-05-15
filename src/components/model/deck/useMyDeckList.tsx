import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useInfiniteCollection } from "@/hooks/useInfiniteCollection";
import { DeckWithoutCards } from "@/models";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useMyDeckList = (userId: string) => {
  const decksQuery = useMemo(() => {
    return query(
      collection(db, `users/${userId}/decks`).withConverter(deckConverter),
      orderBy("createdAt", "desc")
    );
  }, [userId]);

  const { readMore: readMoreDecks, ...decksResult } = useInfiniteCollection({
    query: decksQuery,
    count: 50,
  });

  // 最後のデッキのid
  // これ以上読み込めるかの判定に使用する
  const [lastDeckId, setLastDeckId] = useState<string | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(
          collection(db, `users/${userId}/decks`).withConverter(deckConverter),
          orderBy("createdAt", "asc"),
          limit(1)
        )
      );
      setLastDeckId(snap.docs[0]?.data().id);
    })();

    // decksのdataが変更されたときに確認し直す
  }, [userId, decksResult]);

  const data = useMemo((): DeckWithoutCards[] => {
    return decksResult.data.map((deck): DeckWithoutCards => {
      return {
        id: deck.id,
        name: deck.name,
        cardLength: deck.cardLength,
        published: deck.published,
        tagIds: deck.tagIds,
      };
    });
  }, [decksResult.data]);

  const canReadMore = useMemo(() => {
    return (
      lastDeckId !== undefined &&
      data.length !== 0 &&
      data.every((deck) => deck.id !== lastDeckId)
    );
  }, [data, lastDeckId]);

  const readMore = useCallback(() => {
    if (canReadMore) {
      readMoreDecks();
    }
  }, [canReadMore, readMoreDecks]);

  return {
    data,
    isError: decksResult.isError,
    isInitialLoading: decksResult.isInitialLoading,
    isLoading: decksResult.isLoading,
    canReadMore,
    readMore,
  };
};
