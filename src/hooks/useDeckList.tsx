import { collection, orderBy, query } from "firebase/firestore";
import { useMemo } from "react";
import { db } from "../firebase/config";
import { deckConverter } from "../firebase/firestoreConverters";
import { DeckWithoutCards } from "../types";
import { useFirestoreCollectionData } from "./useFirestoreCollectionData";

export type DeckListData =
  | { status: "loading"; decks: undefined }
  | { status: "error"; decks: undefined }
  | { status: "success"; decks: DeckWithoutCards[] };

export const useDeckList = (userId: string) => {
  const decksQuery = useMemo(
    () =>
      query(
        collection(db, `users/${userId}/decks`).withConverter(deckConverter),
        orderBy("createdAt", "desc")
      ),
    [userId]
  );

  const deckListResult = useFirestoreCollectionData(decksQuery);

  const data: DeckListData = useMemo(() => {
    switch (deckListResult.status) {
      case "loading":
      case "error": {
        return { status: deckListResult.status, decks: undefined };
      }
      case "success": {
        return { status: "success", decks: deckListResult.value };
      }
    }
  }, [deckListResult.status, deckListResult.value]);

  return data;
};
