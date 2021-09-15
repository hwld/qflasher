import { FirestoreDataConverter } from "@firebase/firestore";
import { FirestoreDeck, FirestoreFlashCard } from "../types";

// 入力はidなしで、出力はidありにしたいけど方法が思いつかないので入力ではidを無視する
export const deckConverter: FirestoreDataConverter<FirestoreDeck> = {
  fromFirestore: (snapshot, option) => {
    const deck = snapshot.data(option)!;
    return {
      id: snapshot.id,
      name: deck.name,
      cardLength: deck.cardLength,
    };
  },
  toFirestore: (deck) => {
    return {
      name: deck.name,
      cardLength: deck.cardLength,
    };
  },
};

// 入力はidなしで、出力はidありにしたいけど方法が思いつかないので入力ではidを無視する
export const cardConverter: FirestoreDataConverter<FirestoreFlashCard> = {
  fromFirestore: (snapshot, options) => {
    const card = snapshot.data(options)!;
    return {
      id: snapshot.id,
      index: card.index,
      question: card.question,
      answer: card.answer,
    };
  },
  toFirestore: (card) => {
    return {
      index: card.index,
      question: card.question,
      answer: card.answer,
    };
  },
};
