import { AppLogo } from "@/components/ui/AppLogo";
import { GoogleSignInButton } from "@/components/ui/SignInForm";
import { AnonymousSignInButton } from "@/components/ui/SignInForm/AnonymousSignInButton";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAuthState } from "@/hooks/useAuthState";
import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

export const SignInForm: React.FC<Props> = ({ children, ...styles }) => {
  const { signInWithGoogle, signInAnonymous } = useAuthState();

  const googleSignIn = useAppOperation(signInWithGoogle);
  const anonymousSignIn = useAppOperation(signInAnonymous);

  return (
    <Box
      w="90%"
      maxW="400px"
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
        <AppLogo width={{ base: "70%", md: "80%" }} />
      </Flex>
      <Flex mx="auto" pos={"relative"} flexDir="column" align={"center"}>
        <Text
          pos={"absolute"}
          top={"-20px"}
          fontSize="xl"
          fontWeight={"bold"}
          px={5}
          py={2}
          backgroundColor="gray.700"
          rounded={"xl"}
        >
          Sign in
        </Text>
        <GoogleSignInButton onClick={googleSignIn} mt={14} />
        <AnonymousSignInButton mt={5} onClick={anonymousSignIn} mb={14} />
      </Flex>
    </Box>
  );
};
