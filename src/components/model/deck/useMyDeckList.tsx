import { db } from "@/firebase/config";
import {
  deckConverter,
  privateFieldOnDeckConverter,
} from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { DeckWithoutCards, isErr, isLoading, Result } from "@/types";
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
    if (isLoading(deckListResult) || isLoading(privatesResult)) {
      return Result.Loading();
    }

    if (isErr(deckListResult) || isErr(privatesResult)) {
      displayErrors(deckListResult.error, privatesResult.error);
      return Result.Err();
    }

    // ここに到達した時点でどちらも読み込みが成功している
    const data = deckListResult.data.map((deck): DeckWithoutCards => {
      const tagIds =
        privatesResult.data.find((p) => p.deckId === deck.id)?.tagIds ?? [];
      return { ...deck, tagIds };
    });

    return Result.Ok(data);
  }, [deckListResult, privatesResult]);

  return deckList;
};
