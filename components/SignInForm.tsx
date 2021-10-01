import { Center } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React from "react";
import { auth, firebase } from "../firebase/config";
import { GoogleSignInButton } from "./GoogleSignInButton";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  const handleSignIn = async () => {
    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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
