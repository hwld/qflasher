import { db } from "@/firebase/config";
import { deckConverter } from "@/firebase/firestoreConverters";
import { useInfiniteCollection } from "@/hooks/useInfiniteCollection";
import { DeckWithoutCards } from "@/models";
import { collectionGroup, orderBy, query, where } from "firebase/firestore";
import { useMemo } from "react";

type UsePublicDeckListParams = { count: number };

export const usePublicDeckList = (
  params: UsePublicDeckListParams = { count: 50 }
) => {
  const count = params.count;
  const publicDecksQuery = useMemo(() => {
    return query(
      collectionGroup(db, "decks").withConverter(deckConverter),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
  }, []);

  const { data, ...other } = useInfiniteCollection({
    query: publicDecksQuery,
    count,
  });

  const decks: DeckWithoutCards[] = useMemo(() => {
    return data.map((d): DeckWithoutCards => {
      return {
        ...d,
        tagIds: [],
      };
    });
  }, [data]);

  return { decks, ...other };
};
