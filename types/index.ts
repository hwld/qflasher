import { Timestamp } from "firebase/firestore";

export type Deck = {
  id: string;
  name: string;
  cards: FlashCard[];
  cardLength: number;
};
export type DeckWithoutCards = Omit<Deck, "cards">;
export type FirestoreDeck = DeckWithoutCards & { createdAt: Timestamp };

export type FlashCard = { id: string; question: string; answer: string };
export type FirestoreFlashCard = FlashCard & { index: number };
