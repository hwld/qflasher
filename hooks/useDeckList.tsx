import { collection } from "@firebase/firestore";
import { useMemo } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { deckConverter } from "../firebase/firestoreConverters";
import { DeckWithoutCards } from "../types";

export type DeckListData =
  | { status: "loading"; deckList: undefined }
  | { status: "error"; deckList: undefined }
  | { status: "success"; deckList: DeckWithoutCards[] };

export const useDeckList = (userId: string) => {
  const firestore = useFirestore();

  const myDecksRef = useMemo(
    () =>
      collection(firestore, "users", `${userId}`, "decks").withConverter(
        deckConverter
      ),
    [firestore, userId]
  );
  const {
    data: myDeckListData,
    status,
    error,
  } = useFirestoreCollectionData(myDecksRef);

  const data: DeckListData = useMemo(() => {
    // errorが設定されているのにstatusがsuccessになることがあるので
    const dataStatus = error ? "error" : status;

    switch (dataStatus) {
      case "loading": {
        return { status: dataStatus, deckList: undefined };
      }
      case "error": {
        return { status: dataStatus, deckList: undefined };
      }
      case "success": {
        return { status: dataStatus, deckList: myDeckListData };
      }
    }
  }, [error, myDeckListData, status]);

  return data;
};
