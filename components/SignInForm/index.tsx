import { Box, BoxProps } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/config";
import { GoogleSignInButton } from "./GoogleSignInButton";

type Props = BoxProps;

export const SignInForm: React.FC<Props> = ({ children, ...styleProps }) => {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box bgColor="gray.700" padding={10} boxShadow="dark-lg" {...styleProps}>
      <GoogleSignInButton onClick={handleSignIn} />
    </Box>
  );
};
