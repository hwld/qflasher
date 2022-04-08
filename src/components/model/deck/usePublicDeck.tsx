import { UseDeckResult } from "@/components/model/deck/useDeck";
import { db } from "@/firebase/config";
import { cardConverter, deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { Deck } from "@/models";
import { isErr, isLoading, Result } from "@/utils/result";
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
    if (isErr(publicDecksResult) || isErr(publicCardsResult)) {
      return Result.Err("unknown");
    }

    if (isLoading(publicDecksResult) || isLoading(publicCardsResult)) {
      return Result.Loading();
    }

    const firestoreDeck = publicDecksResult.data[0];
    const firestoreCards = publicCardsResult.data;
    if (!firestoreDeck) {
      return Result.Err("not-found");
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

    return Result.Ok(deck);
  }, [publicCardsResult, publicDecksResult]);

  return publicDeck;
};
