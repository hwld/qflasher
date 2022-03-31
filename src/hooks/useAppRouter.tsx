import { parseQuery, queries, Query, Route } from "@/routes";
import { Result } from "@/types";
import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";

type Param<T extends Route> = { path: T } & (keyof Query[T] extends never
  ? { query?: never }
  : { query: Query[T] });

export const useAppRouter = <T extends Route>(currentPage?: T) => {
  const router = useRouter();

  const push = <T extends Route>(param: Param<T>) => {
    router.push({ pathname: param.path, query: param.query });
  };

  const query = useMemo((): Result<Query[T]> => {
    if (!router.isReady) {
      return { status: "loading", data: undefined, error: undefined };
    }
    if (currentPage === undefined) {
      return { status: "error", data: undefined, error: undefined };
    }
    const currentRoute: Route = currentPage;
    const parsed = parseQuery(router.query);
    if (queries[currentRoute].is(parsed)) {
      return {
        status: "success",
        data: parsed as Query[T],
        error: undefined,
      };
    } else {
      console.log("!g");
      return { status: "error", data: undefined, error: undefined };
    }
  }, [currentPage, router.isReady, router.query]);

  return { ...router, push, query };
};
