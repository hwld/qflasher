import { collection, doc } from "@firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useUser,
} from "reactfire";
import { Deck, FlashCard } from "../types";

type UseMyDeckResult =
  | { status: "loading"; deck: undefined }
  | { status: "success"; deck: Deck }
  | { status: "error"; deck: undefined };

export const useMyDeck = (deckId: string): UseMyDeckResult => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const [deck, setDeck] = useState<Deck>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const deckRef = useMemo(
    () => doc(firestore, "users", `${user?.uid}`, "/decks", deckId),
    [deckId, firestore, user?.uid]
  );
  const cardsRef = useMemo(() => collection(deckRef, "cards"), [deckRef]);

  const {
    status: deckStatus,
    error: deckError,
    data: myDeckData,
  } = useFirestoreDocData(deckRef, {
    idField: "id",
  });
  const {
    status: cardsStatus,
    error: cardsError,
    data: myDeckCardsData,
  } = useFirestoreCollectionData(cardsRef, { idField: "id" });

  // deckDocとcardDoc[]からDeckを作成する
  useEffect(() => {
    //　どちらかがエラーだったらエラーにセットする
    if (
      deckStatus === "error" ||
      cardsStatus === "error" ||
      // statusがerrorじゃなくてもErrorオブジェクトが設定されていることがある。
      // とりあえず原因がわからないからこれも追加するけど後で調べてみたい。
      deckError ||
      cardsError
    ) {
      setStatus("error");
      return;
    }
    // どちらかがロード中だったらロード中にセットする
    if (deckStatus === "loading" || cardsStatus === "loading") {
      setStatus("loading");
      return;
    }

    // どっちも成功
    setDeck(() => {
      const cards = myDeckCardsData.map(
        (c): FlashCard => ({
          id: c.id,
          question: c.question,
          answer: c.answer,
        })
      );
      const deck: Deck = {
        id: myDeckData.id,
        name: myDeckData.name,
        cardLength: myDeckData.cardLength,
        cards,
      };

      return deck;
    });
    setStatus("success");
  }, [
    cardsError,
    cardsStatus,
    deckError,
    deckStatus,
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
