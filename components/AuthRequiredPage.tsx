import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import React, { ReactElement } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { SignInForm } from "./SignInForm";

export type AuthRequiredPageProps = {
  children: (uesrId: string) => ReactElement;
};

const Component: React.VFC<AuthRequiredPageProps> = ({ children }) => {
  const { user, loading, error } = useAuthState();

  if (loading) {
    return (
      <Center minH="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if (user) {
    return children(user.uid);
  } else {
    return <SignInForm />;
  }
};

export const AuthRequiredPage = Component;
