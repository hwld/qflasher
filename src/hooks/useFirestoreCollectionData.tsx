import { Result } from "@/types";
import { FirestoreError, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

type CollectionData<T> = Result<T[], FirestoreError>;

export const useFirestoreCollectionData = <T,>(
  query: Query<T>
): CollectionData<T> => {
  const [data, setData] = useState<CollectionData<T>>({
    status: "loading",
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(query, {
      next: (snap) => {
        setData({
          status: "ok",
          data: snap.docs.map((d) => d.data()),
          error: undefined,
        });
      },
      error: (error) => {
        setData({ status: "error", data: undefined, error });
      },
    });

    return () => {
      setData({ status: "loading", data: undefined, error: undefined });
      unsubscribe();
    };
  }, [query]);

  return data;
};
