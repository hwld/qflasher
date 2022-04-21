import { objectKeys } from "@chakra-ui/utils";
import * as t from "io-ts";
import { BaseRouter } from "next/dist/shared/lib/router/router";

export const isRoute = (value: unknown): value is Route => {
  return (Object.values(routes) as unknown[]).includes(value);
};

type UrlQuery = BaseRouter["query"];
type ParsedUrlQuery = { [T in keyof UrlQuery]: UrlQuery[T] | boolean };
/**
 * Queryの"false"|"true"をbooleanに変換する
 */
export const parseQuery = (value: UrlQuery): ParsedUrlQuery => {
  return objectKeys(value).reduce((prev, key) => {
    let item: ParsedUrlQuery[keyof ParsedUrlQuery] = value[key];
    if (item === "true" || item === "false") {
      item = JSON.parse(item) as boolean;
    }
    return { ...prev, [key]: item };
  }, {} as ParsedUrlQuery);
};

// ここにパスとクエリの型を定義する
// クエリの型は string | string[] | undefined | booleanのサブタイプにしないと色んな所でエラーが出てしまう
// 他に良い実装ないかな・・・
const RouteMap = {
  rootPage: {
    path: "/",
    query: t.type({}),
  },
  myDecksPage: {
    path: "/decks/my/",
    query: t.type({}),
  },
  publicDecksPage: {
    path: "/decks/public/",
    query: t.type({}),
  },
  createDeckPage: {
    path: "/decks/create/",
    query: t.type({}),
  },
  editDeckPage: {
    path: "/decks/edit/",
    query: t.type({
      id: t.string,
    }),
  },
  playSettingPage: {
    path: "/decks/play-setting/",
    query: t.intersection([
      t.type({ id: t.string }),
      t.partial({ redirectTo: t.union([t.string, t.undefined]) }),
    ]),
  },
  playDeckPage: {
    path: "/decks/play/",
    query: t.intersection([
      t.type({
        id: t.string,
        initialFront: t.union([t.literal("question"), t.literal("answer")]),
        isOrderRandom: t.boolean,
      }),
      t.partial({ redirectTo: t.union([t.string, t.undefined]) }),
    ]),
  },
  signInPage: {
    path: "/signIn/",
    query: t.type({}),
  },
  notFoundPage: {
    path: "/404/",
    query: t.type({}),
  },
} as const;
type RouteMap = typeof RouteMap;

export type Route = RouteMap[keyof RouteMap]["path"];
// RouteMapBaseのオブジェクトを {Page: path}になるように変換した型
type RouteObj = { [T in keyof RouteMap]: RouteMap[T]["path"] };
export const routes = objectKeys(RouteMap).reduce((prev, key) => {
  const result = { ...prev, [key]: RouteMap[key].path };
  return result;
}, {} as RouteObj);

// RouteMapBaseオブジェクトを {path: query}になるように変換した型
type QueryBase = {
  [T in keyof RouteMap as RouteMap[T]["path"]]: RouteMap[T]["query"];
};
export type Query = { [T in keyof QueryBase]: t.TypeOf<QueryBase[T]> };
export const queries = Object.values(RouteMap).reduce((prev, value) => {
  const result = { ...prev, [value.path]: value.query };
  return result;
}, {} as QueryBase);
