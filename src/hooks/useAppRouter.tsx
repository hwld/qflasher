import { parseQuery, queries, Query, Route } from "@/routes";
import { Result } from "@/types";
import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";

type Param<T extends Route> = { path: T } & (keyof Query[T] extends never
  ? { query?: never }
  : { query: Query[T] });

type UseAppRouterParam<T extends Route> = {
  currentPage?: T;
  validateQuery?: (query: Query[T]) => boolean;
};
export const useAppRouter = <T extends Route>(
  param: UseAppRouterParam<T> = {}
) => {
  const { currentPage, validateQuery } = param;
  const router = useRouter();

  const push = <T extends Route>(param: Param<T>) => {
    router.push({ pathname: param.path, query: param.query });
  };

  const query = useMemo((): Result<Query[T]> => {
    if (!router.isReady) {
      return { status: "loading", data: undefined, error: undefined };
    }
    const parsed = parseQuery(router.query);

    if (
      currentPage === undefined ||
      // as Routeをしないとtypescript 4.6ではエラーが出てしまう
      // Nightlyだとエラーが出ないのでそのうち解消されそう
      !queries[currentPage as Route].is(parsed)
    ) {
      return { status: "error", data: undefined, error: undefined };
    }

    // queries[T].is()ってやってもQuery[T]に推論されないため、asを使った。
    // バグの温床になりそう
    const queryData = parsed as Query[T];
    if (validateQuery && !validateQuery(queryData)) {
      return { status: "error", data: undefined, error: undefined };
    }
    return {
      status: "ok",
      data: queryData,
      error: undefined,
    };
  }, [currentPage, validateQuery, router.isReady, router.query]);

  return { ...router, push, query };
};
