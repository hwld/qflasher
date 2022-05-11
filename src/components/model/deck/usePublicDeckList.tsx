import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { DeckWithoutCards } from "@/models";
import { displayErrors } from "@/utils/displayError";
import { isErr, isLoading, Result } from "@/utils/result";
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

  const deckListResult = useFirestoreCollection(publicDecksQuery);

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
