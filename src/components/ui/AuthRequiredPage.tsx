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
  const { userResult } = useAuthState();

  useLoadingEffect(userResult.status === "loading");

  if (userResult.status === "loading") {
    return null;
  } else if (userResult.data) {
    return children(userResult.data.uid);
  } else {
    return (
      <Center mx="auto">
        <SignInForm mt={10} w="90%" maxW="400px" />
      </Center>
    );
  }
};
