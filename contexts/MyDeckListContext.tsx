import { createContext, useContext } from "react";
import {
  DeckListData,
  DeckListOperation,
  useMyDeckList,
} from "../hooks/useMyDeckList";

const MyDeckListDataContext = createContext<DeckListData>({
  status: "error",
  deckList: [],
});
const MyDeckListOperationContext = createContext<DeckListOperation>({
  addDeck: () => Promise.reject(),
  updateDeck: () => Promise.reject(),
  deleteDeck: () => Promise.reject(),
});

export const MyDeckListContextProvider: React.FC = ({ children }) => {
  const [data, operations] = useMyDeckList();

  return (
    <MyDeckListDataContext.Provider value={data}>
      <MyDeckListOperationContext.Provider value={operations}>
        {children}
      </MyDeckListOperationContext.Provider>
    </MyDeckListDataContext.Provider>
  );
};

export const useMyDeckListData = () => useContext(MyDeckListDataContext);
export const useMyDeckListOperations = () =>
  useContext(MyDeckListOperationContext);
