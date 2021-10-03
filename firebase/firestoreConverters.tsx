import { FirestoreDataConverter } from "firebase/firestore";
import { FirestoreDeck, FirestoreFlashCard } from "../types";

export const deckConverter: FirestoreDataConverter<FirestoreDeck> = {
  fromFirestore: (snapshot, option) => {
    const deck = snapshot.data(option)!;
    return {
      id: deck.id,
      name: deck.name,
      cardLength: deck.cardLength,
      createdAt: deck.createdAt,
    };
  },
  toFirestore: (deck) => {
    return {
      id: deck.id,
      name: deck.name,
      cardLength: deck.cardLength,
      createdAt: deck.createdAt,
    };
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
    return {
      id: card.id,
      index: card.index,
      question: card.question,
      answer: card.answer,
    };
  },
};
