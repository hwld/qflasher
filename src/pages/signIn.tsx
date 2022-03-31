import { SignInForm } from "@/components/ui/SignInForm";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  const router = useAppRouter();
  const { userResult } = useAuthState();

  const handleAfterSIgnIn = () => {
    router.push({ path: routes.myDecksPage });
  };

  return (
    <Flex justify={"center"}>
      <Flex
        flexDir={"column"}
        align="center"
        mt={"50px"}
        w={"90%"}
        maxW="400px"
      >
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
        <SignInForm mt={5} afterSignIn={handleAfterSIgnIn} />
      </Flex>
    </Flex>
  );
};

export default SignInPage;
