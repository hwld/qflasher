import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { DeckWithoutCards, isErr, isLoading, Result } from "@/types";
import { displayErrors } from "@/utils/displayError";
import { collectionGroup, orderBy, query, where } from "firebase/firestore";
import { useMemo } from "react";

export const usePublicDeckList = (): Result<DeckWithoutCards[]> => {
  const publicDecksQuery = useMemo(() => {
    return query(
      collectionGroup(db, "decks").withConverter(deckConverter),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
  }, []);

  const deckListResult = useFirestoreCollectionData(publicDecksQuery);

  const deckList = useMemo((): Result<DeckWithoutCards[]> => {
    if (isLoading(deckListResult)) {
      return deckListResult;
    }
    if (isErr(deckListResult)) {
      displayErrors(deckListResult.error);
      return Result.Err();
    }

    const deckInfo: DeckWithoutCards[] = deckListResult.data.map((d) => ({
      ...d,
      tagIds: [],
    }));

    return Result.Ok(deckInfo);
  }, [deckListResult]);

  return deckList;
};
