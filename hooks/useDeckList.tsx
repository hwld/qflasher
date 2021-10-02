import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/config";
import { deckConverter } from "../firebase/firestoreConverters";
import { DeckWithoutCards } from "../types";

export type DeckListData =
  | { status: "loading"; deckList: undefined }
  | { status: "error"; deckList: undefined }
  | { status: "success"; deckList: DeckWithoutCards[] };

export const useDeckList = (userId: string) => {
  const [deckList, setDeckList] = useState<DeckWithoutCards[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>();

  const myDecksRef = useMemo(
    () => collection(db, `users/${userId}/decks`).withConverter(deckConverter),
    [userId]
  );

  useEffect(() => {
    const unSubscribe = onSnapshot(myDecksRef, {
      next: (snap) => {
        setDeckList(snap.docs.map((d) => d.data()));
        setLoading(false);
      },
      error: (e) => {
        setError(e);
        setLoading(false);
      },
    });
    return () => unSubscribe();
  }, [myDecksRef]);

  const data: DeckListData = useMemo(() => {
    if (loading) {
      return { status: "loading", deckList: undefined };
    }

    if (error) {
      return { status: "error", deckList: undefined };
    }

    // TODO 読み込みは成功するけど存在しない場合は？
    return { status: "success", deckList };
  }, [deckList, error, loading]);

  return data;
};
