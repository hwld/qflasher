import { db } from "@/firebase/config";
import {
  cardConverter,
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { Deck, Result } from "@/types";
import { collectionGroup, query, where } from "firebase/firestore";
import { useMemo } from "react";

type UseDeckForPlayingResult = Result<Deck>;

// 自分のデッキか、公開されているデッキを取得することができる
export const useDeckForPlaying = (
  userId: string | undefined,
  deckId: string
): UseDeckForPlayingResult => {
  const decksQuery = useMemo(() => {
    return collectionGroup(db, "decks").withConverter(deckConverter);
  }, []);

  const publishedDecksQuery = useMemo(() => {
    return query(
      decksQuery,
      where("published", "==", true),
      where("id", "==", deckId)
    );
  }, [deckId, decksQuery]);
  const myDecksQuery = useMemo(() => {
    return query(
      decksQuery,
      where("uid", "==", userId),
      where("id", "==", deckId)
    );
  }, [deckId, decksQuery, userId]);

  // 自分のデッキを取得するときにのみタグのデータを取得する
  const privatesQuery = useMemo(() => {
    return query(
      collectionGroup(db, "private").withConverter(privateFieldOnDeckConverter),
      where("uid", "==", userId),
      where("deckId", "==", deckId)
    );
  }, [deckId, userId]);

  const publishedCardsQuery = useMemo(() => {
    return query(
      collectionGroup(db, "cards").withConverter(cardConverter),
      where("published", "==", true),
      where("deckId", "==", deckId)
    );
  }, [deckId]);
  const myCardsQuery = useMemo(() => {
    return query(
      collectionGroup(db, "cards").withConverter(cardConverter),
      where("uid", "==", userId),
      where("deckId", "==", deckId)
    );
  }, [deckId, userId]);

  const publishedDecks = useFirestoreCollectionData(publishedDecksQuery);
  const myDecks = useFirestoreCollectionData(myDecksQuery);
  const privates = useFirestoreCollectionData(privatesQuery);
  const publishedCards = useFirestoreCollectionData(publishedCardsQuery);
  const myCards = useFirestoreCollectionData(myCardsQuery);

  const deck = useMemo((): UseDeckForPlayingResult => {
    // 補完を聞かせるために繰り返し書いている
    // 他に方法あるんだろうか
    if (
      publishedDecks.status === "error" ||
      myDecks.status === "error" ||
      privates.status === "error" ||
      publishedCards.status === "error" ||
      myCards.status === "error"
    ) {
      return { status: "error", data: undefined, error: undefined };
    }
    if (
      publishedDecks.status === "loading" ||
      myDecks.status === "loading" ||
      privates.status === "loading" ||
      publishedCards.status === "loading" ||
      myCards.status === "loading"
    ) {
      return { status: "loading", data: undefined, error: undefined };
    }

    const firestoreDeck = [...myDecks.data, ...publishedDecks.data][0];
    const firestoreCards = [...myCards.data, ...publishedCards.data];
    if (!firestoreDeck || !firestoreCards) {
      return { status: "error", data: undefined, error: undefined };
    }

    const tagIds = privates.data[0]?.tagIds ?? [];

    const deck: Deck = {
      id: firestoreDeck.id,
      name: firestoreDeck.name,
      cards: firestoreCards,
      cardLength: firestoreCards.length,
      published: firestoreDeck.published,
      tagIds,
    };

    return { status: "success", data: deck, error: undefined };
  }, [
    myCards.data,
    myCards.status,
    myDecks.data,
    myDecks.status,
    privates.data,
    privates.status,
    publishedCards.data,
    publishedCards.status,
    publishedDecks.data,
    publishedDecks.status,
  ]);

  return deck;
};
