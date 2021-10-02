import {
  collection,
  doc,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/config";
import { cardConverter, deckConverter } from "../firebase/firestoreConverters";
import { Deck, DeckWithoutCards, FlashCard } from "../types";

type UseMyDeckResult =
  | { status: "loading"; deck: undefined }
  | { status: "success"; deck: Deck }
  | { status: "error"; deck: undefined };

export const useMyDeck = (userId: string, deckId: string): UseMyDeckResult => {
  const [deckInfo, setDeckInfo] = useState<DeckWithoutCards>();
  const [deckInfoLoading, setDeckInfoLoading] = useState(true);
  const [deckInfoError, setDeckInfoError] = useState<FirestoreError>();

  const [cards, setCards] = useState<FlashCard[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState<FirestoreError>();

  const [deck, setDeck] = useState<Deck>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const deckRef = useMemo(() => {
    return doc(db, `users/${userId}/decks/${deckId}`).withConverter(
      deckConverter
    );
  }, [deckId, userId]);

  const cardsRef = useMemo(() => {
    return collection(deckRef, "cards").withConverter(cardConverter);
  }, [deckRef]);
  //query(cardsRef, orderBy("index", "asc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(deckRef, {
      next: (snap) => {
        setDeckInfo(snap.data());
        setDeckInfoLoading(false);
      },
      error: (e) => {
        setDeckInfoError(e);
        setDeckInfoLoading(false);
      },
    });
    return () => unsubscribe();
  }, [deckRef]);

  useEffect(() => {
    const unsubscribe = onSnapshot(cardsRef, {
      next: (snap) => {
        setCards(snap.docs.map((d) => d.data()));
        setCardsLoading(false);
      },
      error: (e) => {
        setCardsError(e);
        setCardsLoading(false);
      },
    });
    return () => unsubscribe();
  }, [cardsRef]);

  // deckDocとcardDoc[]からDeckを作成する
  useEffect(() => {
    //　どちらかがエラーだったらエラーにセットする
    if (deckInfoError || cardsError) {
      setStatus("error");
      return;
    }
    // どちらかがロード中だったらロード中にセットする
    if (deckInfoLoading || cardsLoading) {
      setStatus("loading");
      return;
    }

    // TODO 読み込みは成功するけど存在しない場合はdeckInfoundefinedになるんじゃないか
    const deck: Deck = {
      id: deckInfo!.id,
      name: deckInfo!.name,
      cardLength: deckInfo!.cardLength,
      cards,
    };
    setDeck(deck);
    setStatus("success");
  }, [
    cards,
    cardsError,
    cardsLoading,
    deckInfo,
    deckInfoError,
    deckInfoLoading,
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
