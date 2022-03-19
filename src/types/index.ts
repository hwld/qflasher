import { Timestamp } from "firebase/firestore";

export type Deck = {
  id: string;
  uid: string;
  name: string;
  cards: FlashCard[];
  tagIds: string[];
  cardLength: number;
  published: boolean;
};
export type DeckWithoutCards = Omit<Deck, "cards">;
export type FirestoreDeck = Omit<DeckWithoutCards, "tagIds"> & {
  createdAt: Timestamp;
};

export type PrivateFieldOnDeck = {
  uid: string;
  tagIds: string[];
  deckId: string;
};

export type FlashCard = { id: string; question: string; answer: string };
export type FirestoreFlashCard = FlashCard & { index: number };

export type Tag = { id: string; name: string };
export type FirestoreTag = Tag & { createdAt: Timestamp };

export type Operation<T extends unknown[], R> = (...args: T) => Promise<R>;
export type WithResult<T extends Operation<any, any>> = (
  ...args: Parameters<T>
) => Promise<Result<Awaited<ReturnType<T>>>>;

export type Result<T, E = undefined> =
  | { status: "loading"; data: undefined; error: undefined }
  | { status: "error"; data: undefined; error: E }
  | { status: "success"; data: T; error: undefined };
