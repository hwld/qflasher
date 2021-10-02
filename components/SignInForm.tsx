import { Center } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";
import { GoogleSignInButton } from "./GoogleSignInButton";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Center minH="100vh">
      <Box bgColor="gray.700" padding={10} boxShadow="dark-lg">
        <GoogleSignInButton onClick={handleSignIn} />
      </Box>
    </Center>
  );
};

export const SignInForm = Component;
