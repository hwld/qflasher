import { Result } from "@/hooks/useWithResult";
import { Timestamp } from "firebase/firestore";

export type Deck = {
  id: string;
  name: string;
  cards: FlashCard[];
  tagIds: string[];
  cardLength: number;
};
export type DeckWithoutCards = Omit<Deck, "cards">;
export type FirestoreDeck = DeckWithoutCards & { createdAt: Timestamp };

export type FlashCard = { id: string; question: string; answer: string };
export type FirestoreFlashCard = FlashCard & { index: number };

export type Tag = { id: string; name: string };
export type FirestoreTag = Tag & { createdAt: Timestamp };

export type Operation<T extends unknown[], R> = (...args: T) => Promise<R>;
export type OperationWithResult<T extends Operation<any, any>> = (
  ...args: Parameters<T>
) => Promise<Result<Awaited<ReturnType<T>>>>;
