import { db } from "@/firebase/config";
import {
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { DeckWithoutCards, Result } from "@/types";
import { displayErrors } from "@/utils/displayError";
import {
  collection,
  collectionGroup,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useMemo } from "react";

export type DeckListData = Result<DeckWithoutCards[]>;

export const useMyDeckList = (userId: string): DeckListData => {
  const decksRef = useMemo(() => {
    return collection(db, `users/${userId}/decks`);
  }, [userId]);
  const decksQuery = useMemo(
    () =>
      query(
        decksRef.withConverter(deckConverter),
        orderBy("createdAt", "desc")
      ),
    [decksRef]
  );
  const privatesRef = useMemo(() => {
    return query(
      collectionGroup(db, "private").withConverter(privateFieldOnDeckConverter),
      where("uid", "==", userId)
    );
  }, [userId]);

  const deckListResult = useFirestoreCollectionData(decksQuery);
  const privatesResult = useFirestoreCollectionData(privatesRef);

  const deckList = useMemo((): Result<DeckWithoutCards[]> => {
    if (
      deckListResult.status === "loading" ||
      privatesResult.status === "loading"
    ) {
      return { status: "loading", data: undefined, error: undefined };
    }

    if (
      deckListResult.status === "error" ||
      privatesResult.status === "error"
    ) {
      displayErrors(deckListResult.error, privatesResult.error);
      return { status: "error", data: undefined, error: undefined };
    }

    // ここに到達した時点でどちらも読み込みが成功している
    const data = deckListResult.data.map((deck): DeckWithoutCards => {
      const tagIds =
        privatesResult.data.find((p) => p.deckId === deck.id)?.tagIds ?? [];
      return { ...deck, tagIds };
    });

    return { status: "ok", data, error: undefined };
  }, [
    deckListResult.data,
    deckListResult.error,
    deckListResult.status,
    privatesResult.data,
    privatesResult.error,
    privatesResult.status,
  ]);

  return deckList;
};
