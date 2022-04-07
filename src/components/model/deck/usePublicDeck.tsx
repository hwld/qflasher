import { UseDeckResult } from "@/components/model/deck/useDeck";
import { db } from "@/firebase/config";
import { cardConverter, deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { Deck } from "@/types";
import { collectionGroup, orderBy, query, where } from "firebase/firestore";
import { useMemo } from "react";

export const usePublicDeck = (deckId: string) => {
  const decksQuery = useMemo(() => {
    return collectionGroup(db, "decks").withConverter(deckConverter);
  }, []);

  const publicDecksQuery = useMemo(() => {
    return query(
      decksQuery,
      where("published", "==", true),
      where("id", "==", deckId)
    );
  }, [deckId, decksQuery]);

  const publicCardsQuery = useMemo(() => {
    return query(
      collectionGroup(db, "cards").withConverter(cardConverter),
      where("published", "==", true),
      where("deckId", "==", deckId),
      orderBy("index", "asc")
    );
  }, [deckId]);

  const publicDecksResult = useFirestoreCollectionData(publicDecksQuery);
  const publicCardsResult = useFirestoreCollectionData(publicCardsQuery);

  const publicDeck = useMemo((): UseDeckResult => {
    if (
      publicDecksResult.status === "error" ||
      publicCardsResult.status === "error"
    ) {
      return { status: "error", data: undefined, error: "unknown" };
    }

    if (
      publicDecksResult.status === "loading" ||
      publicCardsResult.status === "loading"
    ) {
      return { status: "loading", data: undefined, error: undefined };
    }
    const firestoreDeck = publicDecksResult.data[0];
    const firestoreCards = publicCardsResult.data;
    if (!firestoreDeck) {
      return { status: "error", data: undefined, error: "not-found" };
    }

    const deck: Deck = {
      id: firestoreDeck.id,
      name: firestoreDeck.name,
      cards: firestoreCards,
      cardLength: firestoreCards.length,
      published: firestoreDeck.published,
      // 公開デッキはタグの情報を取得しない
      tagIds: [],
    };

    return { status: "ok", data: deck, error: undefined };
  }, [
    publicCardsResult.data,
    publicCardsResult.status,
    publicDecksResult.data,
    publicDecksResult.status,
  ]);

  return publicDeck;
};
