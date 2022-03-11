import { db } from "@/firebase/config";
import { cardConverter, deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { useFirestoreDocData } from "@/hooks/useFirestoreDocData";
import { Deck } from "@/types";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { Reducer, useEffect, useMemo, useReducer } from "react";

type UseMyDeckResult =
  | { status: "loading" }
  | { status: "success"; deck: Deck }
  | { status: "error"; deck: undefined; error: "not-found" | "unknown" };

type Action =
  | { type: "load" }
  | { type: "success"; deck: Deck }
  | { type: "error"; error: "not-found" | "unknown" };

const reducer: Reducer<UseMyDeckResult, Action> = (_, action) => {
  switch (action.type) {
    case "load": {
      return { status: "loading" };
    }
    case "success": {
      return { status: "success", deck: action.deck };
    }
    case "error": {
      return { status: "error", error: action.error };
    }
  }
};

export const useMyDeck = (userId: string, deckId: string): UseMyDeckResult => {
  const [state, dispatch] = useReducer(reducer, {
    status: "loading",
  });

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
      if (deckInfoResult.error?.code === "permission-denied") {
        dispatch({ type: "error", error: "not-found" });
        return;
      }

      dispatch({ type: "error", error: "unknown" });
      return;
    }
    // どちらかがロード中だったらロード中にセットする
    if (
      deckInfoResult.status === "loading" ||
      cardsResult.status === "loading"
    ) {
      dispatch({ type: "load" });
      return;
    }

    // firestoreのルールでドキュメントが存在しない場合にはエラーを出すようにしているので、
    // ここに到達したときにはvalueはundefinedではないはず
    if (!deckInfoResult.value) {
      throw new Error("Succeeded with non-existent deckInfo.");
    }

    const deckInfo = deckInfoResult.value;
    const deck: Deck = {
      id: deckInfo.id,
      name: deckInfo.name,
      tagIds: deckInfo.tagIds,
      cardLength: deckInfo!.cardLength,
      cards: cardsResult.value,
      published: deckInfo.published,
    };
    dispatch({ type: "success", deck });
  }, [cardsResult, deckInfoResult]);

  return state;
};
