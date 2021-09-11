import { collection, deleteDoc, doc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { Deck } from "../types";

const useMyDeckListData = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();

  const myDecksRef = collection(firestore, "users", `${user?.uid}`, "decks");
  const { data: myDeckListData = [], status } = useFirestoreCollectionData(
    myDecksRef,
    {
      idField: "id",
    }
  );
  const myDeckList = useMemo(() => {
    return myDeckListData.map((d): Deck => {
      return { id: d.id, name: d.name, cards: d.cards };
    });
  }, [myDeckListData]);

  const addDeck = useCallback(
    async (deck: Deck) => {
      const deckDoc = doc(myDecksRef);
      await setDoc(deckDoc, {
        name: deck.name,
        cards: deck.cards,
      });
    },
    [myDecksRef]
  );

  const deleteDeck = useCallback(
    async (id: string) => {
      await deleteDoc(doc(myDecksRef, id));
    },
    [myDecksRef]
  );

  const updateDeck = useCallback(
    async (deck: Deck) => {
      await setDoc(doc(myDecksRef, deck.id), {
        name: deck.name,
        cards: deck.cards,
      });
    },
    [myDecksRef]
  );

  return { status, myDeckList, addDeck, deleteDeck, updateDeck };
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
