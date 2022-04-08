import { DeckCard, DeckWithoutCards, PrivateFieldOnDeck, Tag } from "@/models";
import { FirestoreDataConverter, Timestamp } from "firebase/firestore";

export type FirestoreDeck = Omit<DeckWithoutCards, "tagIds"> & {
  uid: string;
  createdAt: Timestamp;
};
export type FirestoreDeckCard = DeckCard & {
  index: number;
  deckId: string;
  uid: string;
  published: boolean;
};
export type FirestoreTag = Tag & { createdAt: Timestamp };

export const deckConverter: FirestoreDataConverter<FirestoreDeck> = {
  fromFirestore: (snapshot, option) => {
    const deck = snapshot.data(option)!;
    const data: FirestoreDeck = {
      id: deck.id,
      uid: deck.uid,
      name: deck.name,
      cardLength: deck.cardLength,
      createdAt: deck.createdAt,
      published: deck.published,
    };
    return data;
  },
  toFirestore: (deck) => {
    // deckの型ではプロパティがオプショナルになるのでFirestoreDeckにプロパティが追加されたときにエラーにならないので手動で型をつける
    const firestoreDeck: { [T in keyof FirestoreDeck]: typeof deck[T] } = {
      id: deck.id,
      uid: deck.uid,
      name: deck.name,
      cardLength: deck.cardLength,
      createdAt: deck.createdAt,
      published: deck.published,
    };
    return firestoreDeck;
  },
};

export const privateFieldOnDeckConverter: FirestoreDataConverter<PrivateFieldOnDeck> =
  {
    fromFirestore: (snapshot, options) => {
      const field = snapshot.data(options);
      const data: PrivateFieldOnDeck = {
        uid: field.uid,
        tagIds: field.tagIds,
        deckId: field.deckId,
      };
      return data;
    },
    toFirestore: (field) => {
      return { uid: field.uid, tagIds: field.tagIds, deckId: field.deckId };
    },
  };

export const cardConverter: FirestoreDataConverter<FirestoreDeckCard> = {
  fromFirestore: (snapshot, options) => {
    const card = snapshot.data(options)!;
    const data: FirestoreDeckCard = {
      id: card.id,
      deckId: card.deckId,
      index: card.index,
      question: card.question,
      answer: card.answer,
      uid: card.uid,
      published: card.published,
    };
    return data;
  },
  toFirestore: (card) => {
    const firestoreCard: { [T in keyof FirestoreDeckCard]: typeof card[T] } = {
      id: card.id,
      deckId: card.deckId,
      index: card.index,
      question: card.question,
      answer: card.answer,
      uid: card.uid,
      published: card.published,
    };
    return firestoreCard;
  },
};

export const tagConverter: FirestoreDataConverter<FirestoreTag> = {
  fromFirestore: (snapshot, options) => {
    const tag = snapshot.data(options)!;
    const data: FirestoreTag = {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
    };
    return data;
  },
  toFirestore: (tag) => {
    return { id: tag.id, name: tag.name, createdAt: tag.createdAt };
  },
};
