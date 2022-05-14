import { db } from "@/firebase/config";
import {
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { useInfiniteCollection } from "@/hooks/useInfiniteCollection";
import { DeckWithoutCards } from "@/models";
import { nonNullable } from "@/utils/nonNullable";
import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useMyDeckList = (userId: string) => {
  const decksQuery = useMemo(() => {
    return query(
      collection(db, `users/${userId}/decks`).withConverter(deckConverter),
      orderBy("createdAt", "desc")
    );
  }, [userId]);

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
  }, [userId]);

  const privatesQuery = useMemo(() => {
    return query(
      collectionGroup(db, "private").withConverter(privateFieldOnDeckConverter),
      where("uid", "==", userId),
      orderBy("createdAt", "desc")
    );
  }, [userId]);

  const { readMore: readMoreDecks, ...decksResult } = useInfiniteCollection({
    query: decksQuery,
    count: 50,
  });

  const { readMore: readMorePrivates, ...privatesResult } =
    useInfiniteCollection({
      query: privatesQuery,
      count: 50,
    });

  const data = useMemo((): DeckWithoutCards[] => {
    return decksResult.data
      .map((deck): DeckWithoutCards | null => {
        const privates = privatesResult.data.find((p) => p.deckId === deck.id);
        if (!privates) {
          return null;
        }
        return {
          id: deck.id,
          name: deck.name,
          cardLength: deck.cardLength,
          published: deck.published,
          tagIds: privates.tagIds,
        };
      })
      .filter(nonNullable);
  }, [decksResult.data, privatesResult.data]);

  const canReadMore = useMemo(() => {
    return (
      lastDeckId !== undefined && data.every((deck) => deck.id !== lastDeckId)
    );
  }, [data, lastDeckId]);

  const readMore = useCallback(() => {
    if (canReadMore) {
      readMoreDecks();
      readMorePrivates();
    }
  }, [canReadMore, readMoreDecks, readMorePrivates]);

  return {
    data,
    isError: decksResult.isError || privatesResult.isError,
    isInitialLoading:
      decksResult.isInitialLoading || privatesResult.isInitialLoading,
    isLoading: decksResult.isLoading || privatesResult.isLoading,
    canReadMore,
    readMore,
  };
};
