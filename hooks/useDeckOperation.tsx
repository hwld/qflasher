import { collection, doc, writeBatch } from "@firebase/firestore";
import { deleteDoc, getDocs } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { useFirestore } from "reactfire";
import { FormFlashCard } from "../components/DeckForm";
import { cardConverter, deckConverter } from "../firebase/firestoreConverters";
import { Deck, DeckWithoutCards } from "../types";

export type DeckOperation = {
  addDeck: (deck: Deck) => Promise<void>;
  updateDeck: (deck: DeckWithoutCards, cards: FormFlashCard[]) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
};

export const useDeckOperation = (userId: string): DeckOperation => {
  const firestore = useFirestore();

  const myDecksRef = useMemo(
    () =>
      collection(firestore, "users", `${userId}`, "decks").withConverter(
        deckConverter
      ),
    [firestore, userId]
  );

  const addDeck = useCallback(
    async (deck: Omit<Deck, "id">) => {
      // バッチ書き込みは最大500ドキュメントにしか書き込めないから、後でなんとかしたい
      const batch = writeBatch(firestore);

      // deckの書き込み
      const deckDoc = doc(myDecksRef);
      batch.set(deckDoc, {
        id: deckDoc.id,
        name: deck.name,
        cardLength: deck.cards.length,
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
    [firestore, myDecksRef]
  );

  const deleteDeck = useCallback(
    async (id: string) => {
      const deckDoc = doc(myDecksRef, id);
      await deleteDoc(deckDoc);

      // deckが削除されたらcardsは見えないので削除処理は投げっぱなしにする
      const cardsRef = collection(deckDoc, "cards").withConverter(
        cardConverter
      );
      (await getDocs(cardsRef)).forEach(({ ref }) => {
        deleteDoc(ref);
      });
    },
    [myDecksRef]
  );

  const updateDeck = useCallback(
    async (deckWithoutCards: DeckWithoutCards, formCards: FormFlashCard[]) => {
      const batch = writeBatch(firestore);

      const deckRef = doc(myDecksRef, deckWithoutCards.id);
      batch.set(deckRef, {
        id: deckRef.id,
        name: deckWithoutCards.name,
        cardLength: formCards.filter((c) => !c.deleted).length,
      });
      formCards.forEach((c, index) => {
        // cardはDeckFormで作成した時点でidを識別する必要があるため、firestoreのautoIdは使用しない。
        const cardRef = doc(deckRef, `cards/${c.id}`).withConverter(
          cardConverter
        );
        if (c.deleted) {
          batch.delete(cardRef);
        } else {
          batch.set(cardRef, {
            id: c.id,
            index: index,
            question: c.question,
            answer: c.answer,
          });
        }
      });
      batch.commit();
    },
    [firestore, myDecksRef]
  );

  return { addDeck, updateDeck, deleteDeck };
};
