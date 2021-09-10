import { collection, deleteDoc, doc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { Deck } from "../types";

const useDeckListData = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();

  const decksRef = collection(firestore, "users", `${user?.uid}`, "decks");
  const { data: deckListData } = useFirestoreCollectionData(decksRef, {
    idField: "id",
  });
  const deckList = useMemo(() => {
    if (!deckListData) {
      return [];
    }
    return deckListData.map((d): Deck => {
      return { id: d.id, name: d.name, cards: d.cards };
    });
  }, [deckListData]);

  const addDeck = useCallback(
    async (deck: Deck) => {
      const deckDoc = doc(decksRef);
      await setDoc(deckDoc, {
        name: deck.name,
        cards: deck.cards,
      });
    },
    [decksRef]
  );

  const deleteDeck = useCallback(
    async (id: string) => {
      await deleteDoc(doc(decksRef, id));
    },
    [decksRef]
  );

  const updateDeck = useCallback(
    async (deck: Deck) => {
      await setDoc(doc(decksRef, deck.id), {
        name: deck.name,
        cards: deck.cards,
      });
    },
    [decksRef]
  );

  return { deckList, addDeck, deleteDeck, updateDeck };
};

const deckListContext = createContext<ReturnType<typeof useDeckListData>>({
  deckList: [],
  addDeck: () => Promise.resolve(),
  deleteDeck: () => Promise.resolve(),
  updateDeck: () => Promise.resolve(),
});

export const DeckListContextProvider: React.FC = ({ children }) => {
  const useDeckListDataResult = useDeckListData();
  return (
    <deckListContext.Provider value={useDeckListDataResult}>
      {children}
    </deckListContext.Provider>
  );
};

export const useDeckList = () => useContext(deckListContext);
