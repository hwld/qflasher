import { Query, Route } from "@/routes";
import { useRouter } from "next/dist/client/router";

type Param<T extends Route> = { path: T } & (keyof Query[T] extends never
  ? { query?: never }
  : { query: Query[T] });

export const useAppRouter = () => {
  const router = useRouter();

  const push = <T extends Route>(param: Param<T>) => {
    router.push({ pathname: param.path, query: param.query });
  };

  return { ...router, push };
};
