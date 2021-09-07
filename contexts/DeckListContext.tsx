import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Deck } from "../types";

const deckListContext = createContext<{
  deckList: Deck[];
  setDeckList: Dispatch<SetStateAction<Deck[]>>;
}>({ deckList: [], setDeckList: () => {} });

const useDeckList = () => {
  const [deckList, setDeckList] = useState<Deck[]>([]);
  return { deckList, setDeckList };
};

export const DeckListContextProvider: React.FC = ({ children }) => {
  const { deckList, setDeckList } = useDeckList();
  return (
    <deckListContext.Provider value={{ deckList, setDeckList }}>
      {children}
    </deckListContext.Provider>
  );
};

export const useDeckListContext = () => useContext(deckListContext);
