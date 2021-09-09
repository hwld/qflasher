import { createContext, useCallback, useContext, useState } from "react";
import { Deck } from "../types";

const useDeckListData = () => {
  const [deckList, setDeckList] = useState<Deck[]>([]);

  const addDeck = useCallback((deck: Deck) => {
    setDeckList((decks) => [...decks, deck]);
  }, []);

  const deleteDeck = useCallback((id: string) => {
    setDeckList((decks) => decks.filter((d) => d.id !== id));
  }, []);

  const updateDeck = useCallback((deck: Deck) => {
    setDeckList((decks) =>
      decks.map((d) => {
        if (d.id === deck.id) {
          return deck;
        }
        return d;
      })
    );
  }, []);

  return { deckList, addDeck, deleteDeck, updateDeck };
};

const deckListContext = createContext<ReturnType<typeof useDeckListData>>({
  deckList: [],
  addDeck: () => {},
  deleteDeck: () => {},
  updateDeck: () => {},
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
