import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useInfiniteCollection } from "@/hooks/useInfiniteCollection";
import { DeckWithoutCards } from "@/models";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

export const useMyDeckList = (userId: string, tagId: string | undefined) => {
  const decksQuery = useMemo(() => {
    let q = query(
      collection(db, `users/${userId}/decks`).withConverter(deckConverter),
      orderBy("createdAt", "desc")
    );
    if (tagId) {
      q = query(q, where("tagIds", "array-contains", tagId));
    }
    return q;
  }, [tagId, userId]);

  const { readMore: readMoreDecks, ...decksResult } = useInfiniteCollection({
    query: decksQuery,
    count: 30,
  });

  // 最後のデッキのid
  // これ以上読み込めるかの判定に使用する
  const [lastDeckId, setLastDeckId] = useState<string | undefined>(undefined);
  useLayoutEffect(() => {
    (async () => {
      let q = query(
        collection(db, `users/${userId}/decks`).withConverter(deckConverter),
        orderBy("createdAt", "asc"),
        limit(1)
      );
      if (tagId) {
        q = query(q, where("tagIds", "array-contains", tagId));
      }
      const snap = await getDocs(q);
      setLastDeckId(snap.docs[0]?.data().id);
    })();

    // decksのdataが変更されたときに確認し直す
  }, [userId, decksResult, tagId]);

  // useLayoutEffectを使用することで、
  // useInfiniteCollection内のuseEffectのsetStateでinitialLoadingがtrueになる前に
  // canReadMoreをfalseにしてる
  // もっとわかりやすくかけないかなあ・・・
  useLayoutEffect(() => {
    setLastDeckId(undefined);
  }, [tagId]);

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
