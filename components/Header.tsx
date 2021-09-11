import { Box, Button, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { Logo } from "./Logo";

type Props = FlexProps;

const Component: React.FC<Props> = ({ ...styleProps }) => {
  const { data: signInCheckResult } = useSigninCheck();
  const auth = useAuth();
  const height = 60;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {}
  };

  return (
    <>
      <Flex
        bgGradient="linear(to-r, green.500 70%, green.400)"
        position="fixed"
        w="100vw"
        h={`${height}px`}
        zIndex="1"
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
      <Box h={`${height}px`} />
    </>
  );
};

export const Header = Component;
