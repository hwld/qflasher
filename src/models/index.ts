export type Deck = {
  id: string;
  name: string;
  cards: FlashCard[];
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

export type FlashCard = { id: string; question: string; answer: string };

export type Tag = { id: string; name: string };
