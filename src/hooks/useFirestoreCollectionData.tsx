import { Result } from "@/utils/result";
import { FirestoreError, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

type CollectionData<T> = Result<T[], FirestoreError>;

export const useFirestoreCollectionData = <T,>(
  query: Query<T>
): CollectionData<T> => {
  const [data, setData] = useState<CollectionData<T>>(Result.Loading());

  useEffect(() => {
    const unsubscribe = onSnapshot(query, {
      next: (snap) => {
        setData(Result.Ok(snap.docs.map((d) => d.data())));
      },
      error: (error) => {
        setData(Result.Err(error));
      },
    });

    return () => {
      setData(Result.Loading());
      unsubscribe();
    };
  }, [query]);

  return data;
};
