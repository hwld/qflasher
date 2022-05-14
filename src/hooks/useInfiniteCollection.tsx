import {
  getDocs,
  limit,
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

export const useInfiniteCollection = <T,>({
  query,
  count,
}: UseInfiniteCollectionParams<T>) => {
  const [data, setData] = useState<T[]>([]);
  const lastSnap = useRef<QueryDocumentSnapshot<T> | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  return { data, isError, isInitialLoading, isLoading, readMore };
};
