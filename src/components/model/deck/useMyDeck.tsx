import { db } from "@/firebase/config";
import {
  cardConverter,
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { UseDeckResult } from "@/components/model/deck/useDeck";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { useFirestoreDocData } from "@/hooks/useFirestoreDocData";
import { Deck } from "@/types";
import {
  collection,
  collectionGroup,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useMemo } from "react";

type UseMyDeckArgs = { userId: string | undefined; deckId: string };

export const useMyDeck = ({
  userId = "noUser",
  deckId,
}: UseMyDeckArgs): UseDeckResult => {
  const deckRef = useMemo(() => {
    return doc(db, `users/${userId}/decks/${deckId}`).withConverter(
      deckConverter
    );
  }, [deckId, userId]);

  const privatesRef = useMemo(() => {
    return query(
      collectionGroup(db, "private").withConverter(privateFieldOnDeckConverter),
      where("uid", "==", userId),
      where("deckId", "==", deckId)
    );
  }, [deckId, userId]);

  const cardsQuery = useMemo(() => {
    return query(
      collection(deckRef, "cards").withConverter(cardConverter),
      orderBy("index", "asc")
    );
  }, [deckRef]);

  const deckInfoResult = useFirestoreDocData(deckRef);
  const privatesResult = useFirestoreCollectionData(privatesRef);
  const cardsResult = useFirestoreCollectionData(cardsQuery);

  // deckDocとcardDoc[]からDeckを作成する
  const deck = useMemo((): UseDeckResult => {
    //　どちらかがエラーだったらエラーにセットする
    if (
      deckInfoResult.status === "error" ||
      privatesResult.status === "error" ||
      cardsResult.status === "error"
    ) {
      if (deckInfoResult.error?.code === "permission-denied") {
        return { status: "error", data: undefined, error: "not-found" };
      }
      return { status: "error", data: undefined, error: "unknown" };
    }
    // どちらかがロード中だったらロード中にセットする
    if (
      deckInfoResult.status === "loading" ||
      privatesResult.status === "loading" ||
      cardsResult.status === "loading"
    ) {
      return { status: "loading", data: undefined, error: undefined };
    }

    // firestoreのルールでドキュメントが存在しない場合にはエラーを出すようにしているので、
    // ここに到達したときにはdataはundefinedではないはず
    if (!deckInfoResult.data) {
      throw new Error("Succeeded with non-existent deckInfo.");
    }

    const deckInfo = deckInfoResult.data;
    const tagIds = privatesResult.data[0]?.tagIds ?? [];

    const deck: Deck = {
      id: deckInfo.id,
      name: deckInfo.name,
      tagIds: tagIds,
      cardLength: deckInfo!.cardLength,
      cards: cardsResult.data,
      published: deckInfo.published,
    };
    return { status: "ok", data: deck, error: undefined };
  }, [
    cardsResult.data,
    cardsResult.status,
    deckInfoResult.data,
    deckInfoResult.error?.code,
    deckInfoResult.status,
    privatesResult.data,
    privatesResult.status,
  ]);

  return deck;
};
