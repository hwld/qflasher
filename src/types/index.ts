import { Timestamp } from "firebase/firestore";

export type Deck = {
  id: string;
  name: string;
  cards: FlashCard[];
  tagIds: string[];
  cardLength: number;
  published: boolean;
};
export type DeckWithoutCards = Omit<Deck, "cards">;
export type FirestoreDeck = Omit<DeckWithoutCards, "tagIds"> & {
  uid: string;
  createdAt: Timestamp;
};

export type PrivateFieldOnDeck = {
  uid: string;
  tagIds: string[];
  deckId: string;
};

export type FlashCard = { id: string; question: string; answer: string };
export type FirestoreFlashCard = FlashCard & {
  index: number;
  deckId: string;
  uid: string;
  published: boolean;
};

export type Tag = { id: string; name: string };
export type FirestoreTag = Tag & { createdAt: Timestamp };

export type Operation<T extends unknown[], R> = (...args: T) => Promise<R>;
export type WithResult<T extends Operation<any, any>> = (
  ...args: Parameters<T>
) => Promise<Result<Awaited<ReturnType<T>>>>;

// すべてのstatusでプロパティ名を同じにするほうが扱いやすいと感じたのでこうしている。
// 例えばTにundefinedが入ってくることがあって、undefinedのokとerrorを一緒に扱いたいときに、
// loadingをチェックしたあとに result.data === undefined とできるけど、
// そもそもerrorとokを一緒に扱うっていうのが設計的にまずい？
type LoadingResult = { status: "loading"; data: undefined; error: undefined };
type OkResult<T> = { status: "ok"; data: T; error: undefined };
type ErrorResult<E> = { status: "error"; data: undefined; error: E };
export type Result<T, E = undefined> =
  | LoadingResult
  | OkResult<T>
  | ErrorResult<E>;

export const Result = {
  Loading: (): LoadingResult => ({
    status: "loading",
    data: undefined,
    error: undefined,
  }),
  Ok: <T>(data: T): OkResult<T> => ({
    status: "ok",
    data,
    error: undefined,
  }),
  Err: <E>(error: E): ErrorResult<E> => ({
    status: "error",
    data: undefined,
    error: error,
  }),
} as const;
