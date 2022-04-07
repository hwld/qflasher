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
  const [data, setData] = useState<DocData<T>>(Result.Loading());

  useEffect(() => {
    const unsubscribe = onSnapshot(query, {
      next: (snap) => {
        setData(Result.Ok(snap.data()));
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
