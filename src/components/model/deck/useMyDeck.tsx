import { UseDeckResult } from "@/components/model/deck/useDeck";
import { db } from "@/firebase/config";
import { cardConverter, deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { Deck } from "@/models";
import { isErr, isLoading, Result } from "@/utils/result";
import { collection, doc, orderBy, query } from "firebase/firestore";
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

  const cardsQuery = useMemo(() => {
    return query(
      collection(deckRef, "cards").withConverter(cardConverter),
      orderBy("index", "asc")
    );
  }, [deckRef]);

  const deckInfoResult = useFirestoreDoc(deckRef);
  const cardsResult = useFirestoreCollection(cardsQuery);

  // deckDocとcardDoc[]からDeckを作成する
  const deck = useMemo((): UseDeckResult => {
    //　どちらかがエラーだったらエラーにセットする
    if (isErr(deckInfoResult) || isErr(cardsResult)) {
      if (deckInfoResult.error?.code === "permission-denied") {
        return Result.Err("not-found");
      }
      return Result.Err("unknown");
    }
    // どちらかがロード中だったらロード中にセットする
    if (isLoading(deckInfoResult) || isLoading(cardsResult)) {
      return Result.Loading();
    }

    // firestoreのルールでドキュメントが存在しない場合にはエラーを出すようにしているので、
    // ここに到達したときにはdataはundefinedではないはず
    if (!deckInfoResult.data) {
      throw new Error("Succeeded with non-existent deckInfo.");
    }

    const deckInfo = deckInfoResult.data;

    const deck: Deck = {
      id: deckInfo.id,
      name: deckInfo.name,
      tagIds: deckInfo.tagIds,
      cardLength: deckInfo!.cardLength,
      cards: cardsResult.data,
      published: deckInfo.published,
    };

    return Result.Ok(deck);
  }, [cardsResult, deckInfoResult]);

  return deck;
};
