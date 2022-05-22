import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useInfiniteCollection } from "@/hooks/useInfiniteCollection";
import { DeckWithoutCards } from "@/models";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as firestoreQuery,
  where,
} from "firebase/firestore";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

export const useMyDeckList = (userId: string, tagId: string | undefined) => {
  const decksQuery = useMemo(() => {
    let query = firestoreQuery(
      collection(db, `users/${userId}/decks`).withConverter(deckConverter),
      orderBy("createdAt", "desc")
    );
    if (tagId) {
      query = firestoreQuery(query, where("tagIds", "array-contains", tagId));
    }
    return query;
  }, [tagId, userId]);

  const {
    readMore: readMoreDecks,
    isInitialLoading,
    isLoading,
    isError,
    ...decksResult
  } = useInfiniteCollection({
    query: decksQuery,
    count: 30,
  });

  // 最後のデッキのid
  // これ以上読み込めるかの判定に使用する
  const [lastDeckId, setLastDeckId] = useState<string | undefined>(undefined);
  useLayoutEffect(() => {
    (async () => {
      let query = firestoreQuery(
        collection(db, `users/${userId}/decks`).withConverter(deckConverter),
        orderBy("createdAt", "asc"),
        limit(1)
      );
      if (tagId) {
        query = firestoreQuery(query, where("tagIds", "array-contains", tagId));
      }
      const snap = await getDocs(query);
      setLastDeckId(snap.docs[0]?.data().id);
    })();

    // decksのdataが変更されたときに確認し直す
  }, [userId, decksResult, tagId]);

  // useLayoutEffectを使用することで、同期的に再レンダリングを行い、tagIdが変更された直後の描画をスキップする。
  // そのため、initialLoadingがfalseでcanReadMoreがtrueの状態が画面に反映されることがない。
  // (参考：https://github.com/facebook/react/issues/17334#issuecomment-1056968834)
  //
  // この同期レンダリングの前に、残っているuseEffectを実行する。ここでuseInfiniteCollectionのinitialLoadが動き、
  // initialLoadingがtrueになる。 次の描画では、initialLoadingがtrueでcanReadMoreがfalseの状態が画面に反映される。
  // (参考: https://github.com/facebook/react/issues/17334#issuecomment-553984285)
  useLayoutEffect(() => {
    setLastDeckId(undefined);
  }, [tagId]);

  const data = useMemo((): DeckWithoutCards[] => {
    return decksResult.data.map((deck): DeckWithoutCards => {
      return {
        id: deck.id,
        name: deck.name,
        userId: deck.userId,
        cardLength: deck.cardLength,
        published: deck.published,
        tagIds: deck.tagIds,
      };
    });
  }, [decksResult.data]);

  const canReadMore = useMemo(() => {
    if (lastDeckId === undefined) {
      return false;
    }

    return data.find((deck) => deck.id === lastDeckId) === undefined;
  }, [data, lastDeckId]);

  const readMore = useCallback(() => {
    if (canReadMore) {
      readMoreDecks();
    }
  }, [canReadMore, readMoreDecks]);

  return {
    data,
    isError,
    isInitialLoading,
    isLoading,
    canReadMore,
    readMore,
  };
};
