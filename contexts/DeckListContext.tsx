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
  const [deckList, setDeckList] = useState<Deck[]>([
    // {
    //   id: "100",
    //   name: "あああああああああああああああああああああああああああああああああああああああああああああああああああ",
    //   cards: [
    //     {
    //       id: Math.random().toString(),
    //       question: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //       answer: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    //     },
    //     {
    //       id: Math.random().toString(),
    //       question:
    //         "ああああああああああああああああああああああああああああああああああああ",
    //       answer:
    //         "いいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいい",
    //     },
    //   ],
    // },
  ]);
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
