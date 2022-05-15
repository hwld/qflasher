import {
  getDocs,
  limit,
  onSnapshot,
  query as firestoreQuery,
  Query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

type UseInfiniteCollectionParams<T> = {
  query: Query<T>;
  count: number;
};

export const useInfiniteCollection = <T extends { id: string }>({
  query,
  count,
}: UseInfiniteCollectionParams<T>) => {
  const [data, setData] = useState<T[]>([]);
  const lastSnap = useRef<QueryDocumentSnapshot<T> | undefined>(undefined);

  const [isError, setIsError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const removeData = useCallback((value: T) => {
    setData((array) => {
      return array.filter((d) => d.id !== value.id);
    });
  }, []);

  const changeData = useCallback((value: T) => {
    setData((array) => {
      return array.map((d) => {
        if (value.id === d.id) {
          return value;
        }
        return d;
      });
    });
  }, []);

  const initialLoad = useCallback(
    async (count: number) => {
      try {
        setIsInitialLoading(true);
        setIsLoading(true);

        const snaps = await getDocs(firestoreQuery(query, limit(count)));
        lastSnap.current = snaps.docs[snaps.docs.length - 1];
        setData(snaps.docs.map((d) => d.data()));
        setIsError(false);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsInitialLoading(false);
        setIsLoading(false);
      }
    },
    [query]
  );

  const readMore = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!lastSnap.current) {
        initialLoad(count);
        return;
      }

      const snaps = await getDocs(
        firestoreQuery(query, startAfter(lastSnap.current), limit(count))
      );
      lastSnap.current = snaps.docs[snaps.docs.length - 1];

      setData((d) => [...d, ...snaps.docs.map((d) => d.data())]);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [count, initialLoad, query]);

  // 初期ローディング
  useEffect(() => {
    initialLoad(count);
  }, [count, initialLoad]);

  // 変更があったときに反映させる
  useEffect(() => {
    const unsubscribe = onSnapshot(query, (snap) => {
      snap.docChanges().forEach((change) => {
        const data = change.doc.data();
        if (change.type === "modified") {
          changeData(data);
        }
        if (change.type === "removed") {
          removeData(data);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [changeData, query, removeData]);

  return { data, isError, isInitialLoading, isLoading, readMore };
};
