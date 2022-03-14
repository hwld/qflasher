import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type HeaderState = {
  showSignInButton: boolean;
  setShowSignInButton: Dispatch<SetStateAction<boolean>>;
};

const HeaderContext = createContext<HeaderState | undefined>(undefined);

export const HeaderStateProvider: React.FC = ({ children }) => {
  // ヘッダにログインボタンを表示するのは、ログインページ以外の認証が不要なページなので
  // そのページでのみこの状態をtrueに変更する。
  // コンポーネントに制御用のpropsを追加することもできたが、SPAでの遷移でちらつきを抑えるためにヘッダを全ページで
  // 共有したかったため、こういった実装にした。
  const [showSignInButton, setShowSignInButton] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        showSignInButton,
        setShowSignInButton,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderState = (): HeaderState => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      "useHeaderState must be used within a HeaderContextProvider "
    );
  }
  return context;
};
