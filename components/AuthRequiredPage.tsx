import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import React from "react";
import { useSigninCheck } from "reactfire";
import { SignInForm } from "./SignInForm";

type Props = {};

const Component: React.FC<Props> = ({ children }) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  if (signInCheckResult.signedIn === true) {
    return <>{children}</>;
  } else {
    return <SignInForm />;
  }
};

export const AuthRequiredPage = Component;
