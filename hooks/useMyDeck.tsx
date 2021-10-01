import { useEffect, useMemo, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import { cardConverter, deckConverter } from "../firebase/firestoreConverters";
import {
  Deck,
  DeckWithoutCards,
  FirestoreFlashCard,
  FlashCard,
} from "../types";

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
    return db
      .collection("users")
      .doc(userId)
      .collection("decks")
      .doc(deckId)
      .withConverter(deckConverter);
  }, [deckId, userId]);

  const cardsRef = useMemo(() => {
    return deckRef.collection("cards").withConverter(cardConverter);
  }, [deckRef]);

  const [myDeckData, deckLoading, deckError] =
    useDocumentData<DeckWithoutCards>(deckRef);
  const [myDeckCardsData, cardsLoading, cardsError] =
    useCollectionData<FirestoreFlashCard>(cardsRef.orderBy("index", "asc"));

  // deckDocとcardDoc[]からDeckを作成する
  useEffect(() => {
    //　どちらかがエラーだったらエラーにセットする
    if (deckError || cardsError) {
      setStatus("error");
      return;
    }
    // どちらかがロード中だったらロード中にセットする
    if (deckLoading || cardsLoading) {
      setStatus("loading");
      return;
    }

    // TODO 読み込みは成功するけど存在しない場合は？
    // どっちも成功
    const cards = myDeckCardsData!.map(
      (c): FlashCard => ({
        id: c.id,
        question: c.question,
        answer: c.answer,
      })
    );
    const deck: Deck = {
      id: myDeckData!.id,
      name: myDeckData!.name,
      cardLength: myDeckData!.cardLength,
      cards,
    };
    setDeck(deck);
    setStatus("success");
  }, [
    cardsError,
    cardsLoading,
    deckError,
    deckLoading,
    myDeckCardsData,
    myDeckData,
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
