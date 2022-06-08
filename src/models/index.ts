export type Deck = {
  id: string;
  name: string;
  userId: string;
  cards: DeckCard[];
  tagIds: string[];
  cardLength: number;
  published: boolean;
};

type DeckFormData = {
  name: string;
  published: boolean;
  tagIds: string[];
  cards: DeckCard[];
};

export const createDefaultDeck = (): Deck => {
  return {
    id: "",
    name: "",
    userId: "",
    tagIds: [],
    cards: [],
    cardLength: 0,
    published: false,
  };
};
export type DeckWithoutCards = Omit<Deck, "cards">;

export type DeckCard = { id: string; question: string; answer: string };

export type Tag = { id: string; name: string };
