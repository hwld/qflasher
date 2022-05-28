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
  const decksQueryBase = useMemo(() => {
    return firestoreQuery(
      collection(db, `users/${userId}/decks`).withConverter(deckConverter)
    );
  }, [userId]);

  const decksQuery = useMemo(() => {
    let query = firestoreQuery(decksQueryBase, orderBy("createdAt", "desc"));
    if (tagId) {
      query = firestoreQuery(query, where("tagIds", "array-contains", tagId));
    }
    return query;
  }, [decksQueryBase, tagId]);

  const {
    readMore: readMoreDecks,
    isInitialLoading,
    isLoading,
    isError,
    data: deckList,
  } = useInfiniteCollection({
    query: decksQuery,
    count: 30,
  });

  // 最後のデッキのid
  // これ以上読み込めるかの判定に使用する
  const [loadingLastDeckId, setLoadingLastDeckId] = useState(false);
  const [lastDeckId, setLastDeckId] = useState<string | undefined>(undefined);
  useLayoutEffect(() => {
    const update = async () => {
      setLoadingLastDeckId(true);

      let query = firestoreQuery(
        decksQueryBase,
        orderBy("createdAt", "asc"),
        limit(1)
      );
      if (tagId) {
        query = firestoreQuery(query, where("tagIds", "array-contains", tagId));
      }
      const snap = await getDocs(query);
      setLastDeckId(snap.docs[0]?.data().id);

      setLoadingLastDeckId(false);
    };

    update();

    // 最後のデータが削除されたときに、lastDeckIdを更新したいので、
    // deckList.lengthを依存リストに追加する
  }, [userId, tagId, decksQueryBase, deckList.length]);

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
    return deckList.map((deck): DeckWithoutCards => {
      return {
        id: deck.id,
        name: deck.name,
        userId: deck.userId,
        cardLength: deck.cardLength,
        published: deck.published,
        tagIds: deck.tagIds,
      };
    });
  }, [deckList]);

  const canReadMore = useMemo(() => {
    if (loadingLastDeckId === true) {
      return false;
    }

    if (lastDeckId === undefined) {
      return false;
    }

    return data.find((deck) => deck.id === lastDeckId) === undefined;
  }, [data, lastDeckId, loadingLastDeckId]);

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
