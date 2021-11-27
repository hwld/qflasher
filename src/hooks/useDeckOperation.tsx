import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { db } from "../firebase/config";
import { cardConverter, deckConverter } from "../firebase/firestoreConverters";
import { Deck, FlashCard } from "../types";

export type DeckOperation = {
  addDeck: (deck: Deck) => Promise<void>;
  updateDeck: (newDeck: Deck, oldCards: FlashCard[]) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
};

export const useDeckOperation = (userId: string): DeckOperation => {
  const decksRef = useMemo(
    () => collection(db, `users/${userId}/decks`).withConverter(deckConverter),
    [userId]
  );

  const addDeck = useCallback(
    async (deck: Omit<Deck, "id">) => {
      // バッチ書き込みは最大500ドキュメントにしか書き込めないから、後でなんとかしたい
      const batch = writeBatch(db);

      // deckの書き込み
      const deckDoc = doc(decksRef);
      batch.set(deckDoc, {
        id: deckDoc.id,
        name: deck.name,
        cardLength: deck.cards.length,
        createdAt: serverTimestamp(),
      });

      // cardsの書き込み
      const cardsRef = collection(deckDoc, "cards").withConverter(
        cardConverter
      );

      deck.cards.forEach((c, index) => {
        // cardはDeckFormで作成した時点でidを識別する必要があるため、firestoreのautoIdは使用しない。
        const cardDoc = doc(cardsRef, c.id);
        batch.set(cardDoc, {
          id: c.id,
          index,
          question: c.question,
          answer: c.answer,
        });
      });

      await batch.commit();
    },
    [decksRef]
  );

  const deleteDeck = useCallback(
    async (id: string) => {
      const deckDoc = doc(decksRef, id);
      await deleteDoc(deckDoc);

      // deckが削除されたらcardsは見えないので削除処理は投げっぱなしにする

      const cardsRef = collection(deckDoc, "cards").withConverter(
        cardConverter
      );
      (await getDocs(cardsRef)).forEach(({ ref }) => {
        deleteDoc(ref);
      });
    },
    [decksRef]
  );

  const updateDeck = useCallback(
    async (newDeck: Deck, oldCards: FlashCard[]) => {
      const batch = writeBatch(db);

      const deckRef = doc(decksRef, newDeck.id);
      const deck = (await getDoc(deckRef)).data();

      if (!deck) {
        throw new Error("存在しないデッキを更新しようとしました");
      }

      batch.set(deckRef, {
        id: deckRef.id,
        name: newDeck.name,
        cardLength: newDeck.cardLength,
        createdAt: deck.createdAt,
      });

      // カードの削除
      oldCards.forEach((old) => {
        if (!newDeck.cards.find((newCard) => newCard.id === old.id)) {
          const cardRef = doc(deckRef, `cards/${old.id}`).withConverter(
            cardConverter
          );
          batch.delete(cardRef);
        }
      });

      // カードの追加・更新
      newDeck.cards.forEach(({ id, question, answer }, index) => {
        const cardRef = doc(deckRef, `cards/${id}`).withConverter(
          cardConverter
        );
        batch.set(cardRef, {
          id,
          index,
          question,
          answer,
        });
      });

      await batch.commit();
    },
    [decksRef]
  );

  return { addDeck, updateDeck, deleteDeck };
};
