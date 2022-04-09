import { DeckListSideMenuNames } from "@/components/pages/DeckListPage";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type SideMenuState = {
  initialWidth: number;
  menuSelected: DeckListSideMenuNames;
  selectMenu: Dispatch<SetStateAction<DeckListSideMenuNames>>;
  storeWidth: (width: number) => void;
};

const SideMenuContext = createContext<SideMenuState | undefined>(undefined);

// 状態をlocalStorageに保存したいためProviderで提供する
export const SideMenuProvider: React.VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const [menuSelected, selectMenu] = useState<DeckListSideMenuNames>("none");

  const initialWidth = useMemo(() => {
    // TODO: IDBから読み込みたい
    return 300;
  }, []);

  const storeWidth = useCallback((number) => {
    //IDBに書き込む
    console.log("write width");
  }, []);

  const state = useMemo(
    (): SideMenuState => ({
      initialWidth,
      menuSelected,
      selectMenu,
      storeWidth,
    }),
    [initialWidth, menuSelected, storeWidth]
  );

  return (
    <SideMenuContext.Provider value={state}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const value = useContext(SideMenuContext);
  if (!value) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }
  return value;
};
