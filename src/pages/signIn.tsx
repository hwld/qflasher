import { SignInForm } from "@/components/ui/SignInForm";
import { useAuthState } from "@/hooks/useAuthState";
import { useInitLoadingEffect } from "@/hooks/useInitLoadingEffect";
import { routes } from "@/routes";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { userResult } = useAuthState();

  useInitLoadingEffect();

  const handleAfterSIgnIn = () => {
    router.push(routes.myDecksPage);
  };

  return (
    <Flex justify={"center"}>
      <Flex flexDir={"column"} align="center" mt={"50px"}>
        {userResult.data ? (
          <Alert
            status="info"
            variant={"top-accent"}
            colorScheme="green"
            rounded={"sm"}
            fontWeight="bold"
          >
            <AlertIcon />
            サインインしています
          </Alert>
        ) : (
          <Alert opacity={0}>
            <AlertIcon />
          </Alert>
        )}
        <SignInForm
          mt={5}
          w={"90%"}
          maxW="400px"
          afterSignIn={handleAfterSIgnIn}
        />
      </Flex>
    </Flex>
  );
};

export default SignInPage;
