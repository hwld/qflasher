import { FirestoreDeck, FirestoreFlashCard, FirestoreTag } from "@/types";
import { FirestoreDataConverter } from "firebase/firestore";

export const deckConverter: FirestoreDataConverter<FirestoreDeck> = {
  fromFirestore: (snapshot, option) => {
    const deck = snapshot.data(option)!;
    return {
      id: deck.id,
      name: deck.name,
      cardLength: deck.cardLength,
      tagIds: deck.tagIds,
      createdAt: deck.createdAt,
    };
  },
  toFirestore: (deck) => {
    // deckの型ではプロパティがオプショナルになるのでFirestoreDeckにプロパティが追加されたときにエラーにならないので手動で型をつける
    const firestoreDeck: { [T in keyof FirestoreDeck]: typeof deck[T] } = {
      id: deck.id,
      name: deck.name,
      cardLength: deck.cardLength,
      tagIds: deck.tagIds,
      createdAt: deck.createdAt,
    };
    return firestoreDeck;
  },
};

export const cardConverter: FirestoreDataConverter<FirestoreFlashCard> = {
  fromFirestore: (snapshot, options) => {
    const card = snapshot.data(options)!;
    return {
      id: card.id,
      index: card.index,
      question: card.question,
      answer: card.answer,
    };
  },
  toFirestore: (card) => {
    const firestoreCard: { [T in keyof FirestoreFlashCard]: typeof card[T] } = {
      id: card.id,
      index: card.index,
      question: card.question,
      answer: card.answer,
    };
    return firestoreCard;
  },
};

export const tagConverter: FirestoreDataConverter<FirestoreTag> = {
  fromFirestore: (snapshot, options) => {
    const tag = snapshot.data(options)!;
    return { id: tag.id, name: tag.name, createdAt: tag.createdAt };
  },
  toFirestore: (tag) => {
    return { id: tag.id, name: tag.name, createdAt: tag.createdAt };
  },
};
