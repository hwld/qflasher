export type Deck = {
  id: string;
  name: string;
  userId: string;
  cards: DeckCard[];
  tagIds: string[];
  cardLength: number;
  published: boolean;
};
export type DeckWithoutCards = Omit<Deck, "cards">;

export type DeckCard = { id: string; question: string; answer: string };

export type Tag = { id: string; name: string };
