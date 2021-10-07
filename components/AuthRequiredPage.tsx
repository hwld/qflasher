import { Center } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { useLoadingEffect } from "../hooks/useLoadingEffect";
import { SignInForm } from "./SignInForm";

export type AuthRequiredPageProps = {
  children: (uesrId: string) => ReactElement;
};

const Component: React.VFC<AuthRequiredPageProps> = ({ children }) => {
  const { user, loading } = useAuthState();

  useLoadingEffect(loading);

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
