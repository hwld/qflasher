import { GoogleSignInButton } from "@/components/ui/SignInForm";
import { useAuthState } from "@/hooks/useAuthState";
import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

export const SignInForm: React.FC<Props> = ({ children, ...styles }) => {
  const { signIn } = useAuthState();
  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box bgColor="gray.700" padding={10} boxShadow="dark-lg" {...styles}>
      <GoogleSignInButton onClick={handleSignIn} />
    </Box>
  );
};
