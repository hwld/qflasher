import { collection, doc, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/config";
import { cardConverter, deckConverter } from "../firebase/firestoreConverters";
import { Deck } from "../types";
import { useFirestoreCollectionData } from "./useFirestoreCollectionData";
import { useFirestoreDocData } from "./useFirestoreDocData";

type UseMyDeckResult =
  | { status: "loading"; deck: undefined }
  | { status: "success"; deck: Deck }
  | { status: "error"; deck: undefined };

export const useMyDeck = (userId: string, deckId: string): UseMyDeckResult => {
  const [deck, setDeck] = useState<Deck>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

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

  const deckInfoResult = useFirestoreDocData(deckRef);
  const cardsResult = useFirestoreCollectionData(cardsQuery);

  // deckDocとcardDoc[]からDeckを作成する
  useEffect(() => {
    //　どちらかがエラーだったらエラーにセットする
    if (deckInfoResult.status === "error" || cardsResult.status === "error") {
      setStatus("error");
      return;
    }
    // どちらかがロード中だったらロード中にセットする
    if (
      deckInfoResult.status === "loading" ||
      cardsResult.status === "loading"
    ) {
      setStatus("loading");
      return;
    }

    // firestoreのルールでドキュメントが存在しない場合にはエラーを出すようにしているので、例外を出す
    if (deckInfoResult.value === undefined) {
      throw new Error("Succeeded with non-existent deckInfo.");
    }

    const deckInfo = deckInfoResult.value;
    const deck: Deck = {
      id: deckInfo.id,
      name: deckInfo.name,
      cardLength: deckInfo!.cardLength,
      cards: cardsResult.value,
    };
    setDeck(deck);
    setStatus("success");
  }, [
    cardsResult.status,
    cardsResult.value,
    deckInfoResult.status,
    deckInfoResult.value,
  ]);

  switch (status) {
    case "loading": {
      return { status, deck: undefined };
    }
    case "success": {
      // successのときはdeckはundefinedではない
      return { status, deck: deck! };
    }
    case "error": {
      return { status, deck: undefined };
    }
  }
};
