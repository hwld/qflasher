import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { useLoadingEffect } from "../hooks/useLoadingEffect";
import { SignInForm } from "./SignInForm";

export type AuthRequiredPageProps = {
  children: (uesrId: string) => ReactElement;
};

export const AuthRequiredPage: React.VFC<AuthRequiredPageProps> = ({
  children,
}) => {
  const { user, loading } = useAuthState();

  useLoadingEffect(loading);

  if (loading) {
    return null;
  } else if (user) {
    return children(user.uid);
  } else {
    return (
      <Box mx="auto">
        <SignInForm mt={10} />
      </Box>
    );
  }
};
