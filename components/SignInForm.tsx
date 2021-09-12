import { Center } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import React from "react";
import { useAuth } from "reactfire";
import { GoogleSignInButton } from "./GoogleSignInButton";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  const auth = useAuth();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
