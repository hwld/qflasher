import { UseDeckResult } from "@/components/model/deck/useDeck";
import { db } from "@/firebase/config";
import {
  cardConverter,
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { Deck } from "@/models";
import { isErr, isLoading, Result } from "@/utils/result";
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

  const deckInfoResult = useFirestoreDoc(deckRef);
  const privatesResult = useFirestoreCollection(privatesRef);
  const cardsResult = useFirestoreCollection(cardsQuery);

  // deckDocとcardDoc[]からDeckを作成する
  const deck = useMemo((): UseDeckResult => {
    //　どちらかがエラーだったらエラーにセットする
    if (isErr(deckInfoResult) || isErr(privatesResult) || isErr(cardsResult)) {
      if (deckInfoResult.error?.code === "permission-denied") {
        return Result.Err("not-found");
      }
      return Result.Err("unknown");
    }
    // どちらかがロード中だったらロード中にセットする
    if (
      isLoading(deckInfoResult) ||
      isLoading(privatesResult) ||
      isLoading(cardsResult)
    ) {
      return Result.Loading();
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

    return Result.Ok(deck);
  }, [cardsResult, deckInfoResult, privatesResult]);

  return deck;
};
