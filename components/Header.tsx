import { Box, Button, Flex, FlexProps, Progress } from "@chakra-ui/react";
import React from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { Logo } from "./Logo";

type Props = { isLoading?: boolean } & FlexProps;

const Component: React.FC<Props> = ({ isLoading, ...styleProps }) => {
  const { data: signInCheckResult } = useSigninCheck();
  const auth = useAuth();
  const headerHeight = 60;
  const progressHeight = 5;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box position="fixed" zIndex="1">
        <Flex
          bgGradient="linear(to-r, green.500 70%, green.400)"
          w="100vw"
          h={`${headerHeight}px`}
          {...styleProps}
          justify="space-between"
          align="center"
        >
          <Logo />
          {signInCheckResult?.signedIn && (
            <Button onClick={handleSignOut} mr={5} colorScheme="red">
              ログアウト
            </Button>
          )}
        </Flex>
        <Progress
          colorScheme="green"
          height={`${progressHeight}px`}
          isIndeterminate={isLoading}
        />
      </Box>
      <Box h={`${headerHeight + progressHeight}px`} />
    </>
  );
};

export const Header = Component;
