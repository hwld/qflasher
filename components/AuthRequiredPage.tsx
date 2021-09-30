import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import React, { ReactElement } from "react";
import { useSigninCheck } from "reactfire";
import { SignInForm } from "./SignInForm";

export type AuthRequiredPageProps = {
  children: (uesrId: string) => ReactElement;
};

const Component: React.VFC<AuthRequiredPageProps> = ({ children }) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return (
      <Center minH="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if (signInCheckResult.signedIn === true) {
    return children(signInCheckResult.user.uid);
  } else {
    return <SignInForm />;
  }
};

export const AuthRequiredPage = Component;
