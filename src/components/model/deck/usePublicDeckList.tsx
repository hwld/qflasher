import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { DeckWithoutCards, Result } from "@/types";
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
    if (deckListResult.status === "loading") {
      return deckListResult;
    }
    if (deckListResult.status === "error") {
      displayErrors(deckListResult.error);
      return { status: "error", data: undefined, error: undefined };
    }

    const deckInfo: DeckWithoutCards[] = deckListResult.data.map((d) => ({
      ...d,
      tagIds: [],
    }));
    return { status: "ok", data: deckInfo, error: undefined };
  }, [deckListResult]);

  return deckList;
};
