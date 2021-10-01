import { useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import { deckConverter } from "../firebase/firestoreConverters";
import { DeckWithoutCards } from "../types";

export type DeckListData =
  | { status: "loading"; deckList: undefined }
  | { status: "error"; deckList: undefined }
  | { status: "success"; deckList: DeckWithoutCards[] };

export const useDeckList = (userId: string) => {
  const myDecksRef = useMemo(() => {
    return db
      .collection("users")
      .doc(userId)
      .collection("decks")
      .withConverter(deckConverter);
  }, [userId]);

  const [myDeckListData, loading, error] =
    useCollectionData<DeckWithoutCards>(myDecksRef);

  const data: DeckListData = useMemo(() => {
    if (loading) {
      return { status: "loading", deckList: undefined };
    }

    if (error) {
      return { status: "error", deckList: undefined };
    }

    // TODO 読み込みは成功するけど存在しない場合は？
    return { status: "success", deckList: myDeckListData! };
  }, [error, loading, myDeckListData]);

  return data;
};
