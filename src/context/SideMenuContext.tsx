import {
  isSideMenuName,
  SideMenuName,
} from "@/components/pages/DeckListPage/DeckListPage";
import { displayErrors } from "@/utils/displayError";
import { get, update } from "idb-keyval";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

type SideMenuState = {
  readWidth: () => Promise<number | undefined>;
  readMenuSelected: () => Promise<SideMenuName | undefined>;
  storeMenuSelected: (menu: SideMenuName) => void;
  storeWidth: (width: number) => void;
};

const SideMenuContext = createContext<SideMenuState | undefined>(undefined);

const defaultState = { menuSelected: "none", initialWidth: 300 } as const;

export const SideMenuProvider: React.VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const readWidth = useCallback(async (): Promise<number | undefined> => {
    try {
      const result = await get<Record<string, unknown>>("sideMenu");
      if (result && typeof result.initialWidth === "number") {
        return result.initialWidth;
      }
    } catch (e) {
      displayErrors(e);
      throw new Error();
    }
  }, []);

  const storeWidth = useCallback((number) => {
    console.log("updateに時間かかってるっぽくね？");
    return update("sideMenu", (old = defaultState) => {
      console.log("inside update");
      return { menuSelected: old.menuSelected, initialWidth: number };
    });
  }, []);

  const readMenuSelected = useCallback(async (): Promise<
    SideMenuName | undefined
  > => {
    try {
      const result = await get<Record<string, unknown>>("sideMenu");
      if (result && isSideMenuName(result.menuSelected)) {
        return result.menuSelected;
      }
    } catch (e) {
      displayErrors(e);
      throw new Error();
    }
  }, []);

  const storeMenuSelected = useCallback((menu: SideMenuName) => {
    return update("sideMenu", (old = defaultState) => {
      return { menuSelected: menu, initialWidth: old.initialWidth };
    });
  }, []);

  const state = useMemo(
    (): SideMenuState => ({
      readWidth,
      readMenuSelected,
      storeWidth,
      storeMenuSelected,
    }),
    [readMenuSelected, readWidth, storeMenuSelected, storeWidth]
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
