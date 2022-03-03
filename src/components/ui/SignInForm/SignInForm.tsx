import { GoogleSignInButton } from "@/components/ui/SignInForm";
import { AnonymousSignInButton } from "@/components/ui/SignInForm/AnonymousSignInButton";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAuthState } from "@/hooks/useAuthState";
import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

export const SignInForm: React.FC<Props> = ({ children, ...styles }) => {
  const { signInWithGoogle, signInAnonymous } = useAuthState();

  const googleSignIn = useAppOperation(signInWithGoogle);
  const anonymousSignIn = useAppOperation(signInAnonymous);

  return (
    <Box bgColor="gray.700" padding={10} boxShadow="dark-lg" {...styles}>
      <GoogleSignInButton onClick={googleSignIn} />
      <AnonymousSignInButton mt={3} onClick={anonymousSignIn} />
    </Box>
  );
};
