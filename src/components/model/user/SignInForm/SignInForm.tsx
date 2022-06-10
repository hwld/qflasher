import { AnonymousSignInButton } from "@/components/model/user/SignInForm/AnonymousSignInButton";
import { GoogleSignInButton } from "@/components/model/user/SignInForm/GoogleSignInButton";
import { AppLogo } from "@/components/ui/AppLogo";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAuthState } from "@/hooks/useAuthState";
import { isOk, Result } from "@/utils/result";
import {
  Box,
  BoxProps,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { UserCredential } from "firebase/auth";
import React from "react";

type Props = { afterSignIn?: () => void } & BoxProps;

export const SignInForm: React.FC<Props> = ({ afterSignIn, ...styles }) => {
  const { signInWithGoogle, signInAnonymous } = useAuthState();
  const logoWidth = useBreakpointValue({ base: "70%", md: "80%" });

  const googleSignIn = useAppOperation(signInWithGoogle);
  const anonymousSignIn = useAppOperation(signInAnonymous);

  const handleSignIn = async (
    callback: () => Promise<Result<UserCredential>>
  ) => {
    const result = await callback();
    if (isOk(result)) {
      afterSignIn?.();
    }
  };
  const handleGoogleSignIn = async () => {
    handleSignIn(googleSignIn);
  };
  const handleAnonumousSignIn = async () => {
    handleSignIn(anonymousSignIn);
  };

  return (
    <Box
      w="100%"
      h="400px"
      bgColor="gray.700"
      boxShadow="dark-lg"
      rounded={"md"}
      overflow="hidden"
      display="flex"
      flexDir={"column"}
      {...styles}
    >
      <Flex
        bgGradient={"linear(to-br, green.400 75%, orange.300 75%)"}
        flexGrow={1}
        justify="center"
        align={"center"}
      >
        <AppLogo width={logoWidth} />
      </Flex>
      <Flex mx="auto" pos={"relative"} flexDir="column" align={"center"}>
        <Text
          pos={"absolute"}
          top={"-20px"}
          fontSize="xl"
          fontWeight={"bold"}
          px={5}
          pt={1}
          backgroundColor="gray.700"
          rounded={"lg"}
        >
          Sign in
        </Text>
        <GoogleSignInButton onClick={handleGoogleSignIn} mt={14} />
        <AnonymousSignInButton mt={5} onClick={handleAnonumousSignIn} mb={14} />
      </Flex>
    </Box>
  );
};
