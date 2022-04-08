export type Deck = {
  id: string;
  name: string;
  cards: DeckCard[];
  tagIds: string[];
  cardLength: number;
  published: boolean;
};
export type DeckWithoutCards = Omit<Deck, "cards">;

export type PrivateFieldOnDeck = {
  uid: string;
  tagIds: string[];
  deckId: string;
};

export type DeckCard = { id: string; question: string; answer: string };

export type Tag = { id: string; name: string };
