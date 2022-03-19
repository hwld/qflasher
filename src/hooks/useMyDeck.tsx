import { db } from "@/firebase/config";
import {
  cardConverter,
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { useFirestoreDocData } from "@/hooks/useFirestoreDocData";
import { Deck, Result } from "@/types";
import {
  collection,
  collectionGroup,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useMemo } from "react";

type UseMyDeckResult = Result<Deck, "not-found" | "unknown">;

export const useMyDeck = (userId: string, deckId: string): UseMyDeckResult => {
  const deckRef = useMemo(() => {
    return doc(db, `users/${userId}/decks/${deckId}`).withConverter(
      deckConverter
    );
  }, [deckId, userId]);

  const privatesRef = useMemo(() => {
    return query(
      collectionGroup(db, "private").withConverter(privateFieldOnDeckConverter),
      where("uid", "==", userId)
    );
  }, [userId]);

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
  // なんでuseMemoじゃないんだろう
  const deck = useMemo((): UseMyDeckResult => {
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
    // ここに到達したときにはvalueはundefinedではないはず
    if (!deckInfoResult.data) {
      throw new Error("Succeeded with non-existent deckInfo.");
    }

    const deckInfo = deckInfoResult.data;

    const tagIds =
      privatesResult.data.find((p) => p.deckId === deckInfo.id)?.tagIds ?? [];

    const deck: Deck = {
      id: deckInfo.id,
      uid: deckInfo.uid,
      name: deckInfo.name,
      tagIds: tagIds,
      cardLength: deckInfo!.cardLength,
      cards: cardsResult.data,
      published: deckInfo.published,
    };
    return { status: "success", data: deck, error: undefined };
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
