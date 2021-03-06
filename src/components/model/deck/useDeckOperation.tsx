import { db } from "@/firebase/config";
import {
  cardConverter,
  deckConverter,
  tagConverter,
} from "@/firebase/firestoreConverters";
import { Deck, DeckCard } from "@/models";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { useCallback, useMemo } from "react";

export type DeckOperation = {
  addDeck: (deck: Deck) => Promise<unknown>;
  updateDeck: (newDeck: Deck, oldCards: DeckCard[]) => Promise<unknown>;
  deleteDeck: (id: string) => Promise<unknown>;
  attachTag: (
    deckId: string,
    tagId: string
  ) => Promise<{ deckName: string; tagName: string; alreadyExisted: boolean }>;
};

export const useDeckOperation = (userId: string): DeckOperation => {
  const decksRef = useMemo(
    () => collection(db, `users/${userId}/decks`).withConverter(deckConverter),
    [userId]
  );

  const addDeck: DeckOperation["addDeck"] = useCallback(
    async (deck: Omit<Deck, "id">) => {
      const batch = writeBatch(db);

      // deckの書き込み
      const deckDoc = doc(decksRef);
      batch.set(deckDoc, {
        id: deckDoc.id,
        userId,
        name: deck.name,
        cardLength: deck.cards.length,
        tagIds: deck.tagIds,
        createdAt: serverTimestamp(),
        published: deck.published,
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
          userId,
          published: deck.published,
          deckId: deckDoc.id,
          index,
          question: c.question,
          answer: c.answer,
        });
      });

      await batch.commit();
    },
    [decksRef, userId]
  );

  const deleteDeck: DeckOperation["deleteDeck"] = useCallback(
    async (id: string) => {
      const batch = writeBatch(db);
      const deckDoc = doc(decksRef, id);
      batch.delete(deckDoc);

      const cardsRef = collection(deckDoc, "cards").withConverter(
        cardConverter
      );
      (await getDocs(cardsRef)).forEach(({ ref }) => {
        batch.delete(ref);
      });

      await batch.commit();
    },
    [decksRef]
  );

  const updateDeck: DeckOperation["updateDeck"] = useCallback(
    async (newDeck: Deck, oldCards: DeckCard[]) => {
      const batch = writeBatch(db);

      const deckRef = doc(decksRef, newDeck.id);
      const oldDeck = (await getDoc(deckRef)).data();

      if (!oldDeck) {
        throw new Error("存在しないデッキを更新しようとしました");
      }

      batch.set(deckRef, {
        id: deckRef.id,
        userId,
        name: newDeck.name,
        cardLength: newDeck.cardLength,
        tagIds: newDeck.tagIds,
        createdAt: oldDeck.createdAt,
        published: newDeck.published,
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
          userId,
          published: newDeck.published,
          deckId: deckRef.id,
          index,
          question,
          answer,
        });
      });

      await batch.commit();
    },
    [decksRef, userId]
  );

  const attachTag: DeckOperation["attachTag"] = useCallback(
    async (deckId: string, tagId: string) => {
      const deckRef = doc(decksRef, deckId);
      const deck = (await getDoc(deckRef)).data();

      const tag = (
        await getDoc(
          doc(db, `users/${userId}/tags/${tagId}`).withConverter(tagConverter)
        )
      ).data();

      if (!deck) {
        throw new Error("存在しないデッキを参照しました");
      }
      if (!tag) {
        throw new Error("存在しないタグを参照しました");
      }

      const alreadyExisted = deck.tagIds.includes(tagId);

      await updateDoc(deckRef, { tagIds: arrayUnion(tagId) });

      return { deckName: deck.name, tagName: tag.name, alreadyExisted };
    },
    [decksRef, userId]
  );

  return { addDeck, updateDeck, deleteDeck, attachTag };
};
