import { objectKeys } from "@chakra-ui/utils";
import * as t from "io-ts";

export const isRoute = (route: string): route is Route => {
  return (Object.values(routes) as string[]).includes(route);
};

// 新しくページを追加したときはここにパスとクエリの型を定義する
const RouteMap = {
  rootPage: { path: "/", query: t.type({}) },
  myDecksPage: { path: "/decks/my", query: t.type({}) },
  publicDecksPage: { path: "/decks/public", query: t.type({}) },
  createDeckPage: { path: "/decks/create", query: t.type({}) },
  editDeckPage: { path: "/decks/edit", query: t.type({}) },
  playSettingPage: { path: "/decks/play-setting", query: t.type({}) },
  playDeckPage: { path: "/decks/play", query: t.type({}) },
  signInPage: { path: "/signIn", query: t.type({}) },
  notFoundPage: { path: "/404", query: t.type({}) },
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
