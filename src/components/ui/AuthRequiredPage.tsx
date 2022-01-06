import { SignInForm } from "@/components/ui/SignInForm";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { Center } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

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
      <Center mx="auto">
        <SignInForm mt={10} />
      </Center>
    );
  }
};
