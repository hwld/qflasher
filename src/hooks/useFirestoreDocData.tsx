import { Result } from "@/types";
import {
  DocumentReference,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type DocData<T> = Result<T | undefined, FirestoreError>;

export const useFirestoreDocData = <T,>(
  query: DocumentReference<T>
): DocData<T> => {
  const [data, setData] = useState<DocData<T>>({
    status: "loading",
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(query, {
      next: (snap) => {
        setData({ status: "ok", data: snap.data(), error: undefined });
      },
      error: (error) => {
        setData({ status: "error", data: undefined, error: error });
      },
    });

    return () => {
      setData({ status: "loading", data: undefined, error: undefined });
      unsubscribe();
    };
  }, [query]);

  return data;
};
