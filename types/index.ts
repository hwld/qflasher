export type Deck = {
  id: string;
  name: string;
  cards: FlashCard[];
  cardLength: number;
};
export type DeckWithoutCards = Omit<Deck, "cards">;
export type FlashCard = { id: string; question: string; answer: string };
