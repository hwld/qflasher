import { collection, deleteDoc, doc, writeBatch } from "@firebase/firestore";
import { getDocs } from "firebase/firestore";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { FormFlashCard } from "../components/DeckForm";
import { Deck, DeckWithoutCards } from "../types";

const useMyDeckListData = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();

  const myDecksRef = useMemo(
    // userがundefinedの場合、users/undefinedにアクセスするrefが作成される。
    () => collection(firestore, "users", `${user?.uid}`, "decks"),
    [firestore, user?.uid]
  );

  const { data: myDeckListData, status } = useFirestoreCollectionData(
    myDecksRef,
    {
      idField: "id",
    }
  );

  const myDeckList: DeckWithoutCards[] = useMemo(() => {
    if (!myDeckListData) {
      return [];
    }
    return myDeckListData.map((data): DeckWithoutCards => {
      return { name: data.name, id: data.id, cardLength: data.cardLength };
    });
  }, [myDeckListData]);

  const addDeck = useCallback(
    async (deck: Omit<Deck, "id">) => {
      // バッチ書き込みは最大500ドキュメントにしか書き込めないから、後でなんとかしたい
      const batch = writeBatch(firestore);

      // deckの書き込み
      const deckDoc = doc(myDecksRef);
      batch.set(deckDoc, {
        name: deck.name,
        cardLength: deck.cards.length,
      });

      // cardsの書き込み
      const cardsRef = collection(deckDoc, "cards");
      for (const c of deck.cards) {
        // cardはDeckFormで作成された時点でidを振って識別する必要があるため、
        //
        const cardDoc = doc(cardsRef, c.id);
        batch.set(cardDoc, {
          question: c.question,
          answer: c.answer,
        });
      }
      await batch.commit();
    },
    [firestore, myDecksRef]
  );

  const deleteDeck = useCallback(
    async (id: string) => {
      const deckDoc = doc(myDecksRef, id);
      await deleteDoc(deckDoc);

      // deckが削除されたらcardsは見えないので削除処理は投げっぱなしにする
      const cardsRef = collection(deckDoc, "cards");
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
        name: deckWithoutCards.name,
        cardLength: formCards.filter((c) => !c.deleted).length,
      });
      for (const c of formCards) {
        // cardはDeckFormで作成した時点でidを識別する必要があるため、firestoreのautoIdは使用しない。
        const cardRef = doc(deckRef, `cards/${c.id}`);
        if (c.deleted) {
          batch.delete(cardRef);
        } else {
          batch.set(cardRef, {
            question: c.question,
            answer: c.answer,
          });
        }
      }

      batch.commit();
    },
    [firestore, myDecksRef]
  );

  return {
    status,
    myDeckList,
    addDeck,
    deleteDeck,
    updateDeck,
  };
};

const MyDeckListContext = createContext<ReturnType<typeof useMyDeckListData>>({
  status: "error",
  myDeckList: [],
  addDeck: () => Promise.reject(),
  deleteDeck: () => Promise.reject(),
  updateDeck: () => Promise.reject(),
});

export const MyDeckListContextProvider: React.FC = ({ children }) => {
  const useDeckListDataResult = useMyDeckListData();
  return (
    <MyDeckListContext.Provider value={useDeckListDataResult}>
      {children}
    </MyDeckListContext.Provider>
  );
};

export const useMyDeckList = () => useContext(MyDeckListContext);
