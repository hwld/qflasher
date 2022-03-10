import { DeckListSideMenuNames } from "@/components/pages/DeckListPage";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type Width = number;
type SideMenuState = {
  menuSelected: DeckListSideMenuNames;
  selectMenu: Dispatch<SetStateAction<DeckListSideMenuNames>>;
  changeWidth: Dispatch<SetStateAction<number>>;
};

// ドラッグによってwidthが頻繁に変更されることを想定しているのでContextを分けてみる
const WidthContext = createContext<Width | undefined>(undefined);
const SideMenuContext = createContext<SideMenuState | undefined>(undefined);

// 状態をlocalStorageに保存したいためProviderで提供する
export const SideMenuProvider: React.VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const [width, changeWidth] = useState(300);
  const [menuSelected, selectMenu] = useState<DeckListSideMenuNames>("none");

  const state = useMemo(
    () => ({ menuSelected, selectMenu, changeWidth }),
    [menuSelected]
  );

  return (
    <WidthContext.Provider value={width}>
      <SideMenuContext.Provider value={state}>
        {children}
      </SideMenuContext.Provider>
    </WidthContext.Provider>
  );
};

export const useSideMenuWidth = () => {
  const value = useContext(WidthContext);
  if (!value) {
    throw new Error("useSideMenuWidth must be used within a SideMenuProvider");
  }
  return value;
};

export const useSideMenu = () => {
  const value = useContext(SideMenuContext);
  if (!value) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }
  return value;
};
