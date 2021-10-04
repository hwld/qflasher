import { Center } from "@chakra-ui/layout";
import React, { ReactElement, useEffect } from "react";
import { useSetAppState } from "../context/AppStateContextProvider";
import { useAuthState } from "../hooks/useAuthState";
import { SignInForm } from "./SignInForm";

export type AuthRequiredPageProps = {
  children: (uesrId: string) => ReactElement;
};

const Component: React.VFC<AuthRequiredPageProps> = ({ children }) => {
  const { setIsLoading } = useSetAppState();
  const { user, loading, error } = useAuthState();

  useEffect(() => {
    // loading中じゃなくて、userが存在しない場合にはappのローディング状態をfalseにする。
    // userが存在する場合にはchildrenでtrueに設定されている可能性があるので何も行わない。
    if (!loading && !user) {
      setIsLoading(false);
    }
  }, [loading, setIsLoading, user]);

  if (loading) {
    return <></>;
  } else if (user) {
    return children(user.uid);
  } else {
    return (
      <Center>
        <SignInForm mt={10} />
      </Center>
    );
  }
};

export const AuthRequiredPage = Component;
