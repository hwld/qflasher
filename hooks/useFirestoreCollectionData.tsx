import { FirestoreError, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

type CollectionData<T> =
  | { status: "loading"; value: undefined; error: undefined }
  | { status: "success"; value: T[]; error: undefined }
  | { status: "error"; value: undefined; error: FirestoreError };

export const useFirestoreCollectionData = <T,>(
  query: Query<T>
): CollectionData<T> => {
  const [data, setData] = useState<CollectionData<T>>({
    status: "loading",
    value: undefined,
    error: undefined,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(query, {
      next: (snap) => {
        setData({
          status: "success",
          value: snap.docs.map((d) => d.data()),
          error: undefined,
        });
      },
      error: (error) => {
        setData({ status: "error", value: undefined, error });
      },
    });

    return () => {
      setData({ status: "loading", value: undefined, error: undefined });
      unsubscribe();
    };
  }, [query]);

  return data;
};
