import {
  DocumentReference,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type DocData<T> =
  | { status: "loading"; value: undefined; error: undefined }
  | { status: "success"; value: T | undefined; error: undefined }
  | { status: "error"; value: undefined; error: FirestoreError };

export const useFirestoreDocData = <T,>(
  query: DocumentReference<T>
): DocData<T> => {
  const [data, setData] = useState<DocData<T>>({
    status: "loading",
    value: undefined,
    error: undefined,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(query, {
      next: (snap) => {
        setData({ status: "success", value: snap.data(), error: undefined });
      },
      error: (error) => {
        setData({ status: "error", value: undefined, error: error });
      },
    });

    return () => {
      setData({ status: "loading", value: undefined, error: undefined });
      unsubscribe();
    };
  }, [query]);

  return data;
};
