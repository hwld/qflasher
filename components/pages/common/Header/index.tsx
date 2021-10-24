import { Box, Flex, FlexProps, Progress } from "@chakra-ui/react";
import React from "react";
import { auth } from "../../../../firebase/config";
import { useAuthState } from "../../../../hooks/useAuthState";
import { AccountMenu } from "./AccountMenu";
import { Logo } from "./Logo";

type Props = { isLoading?: boolean } & FlexProps;

export const Header: React.FC<Props> = ({ isLoading, ...styles }) => {
  const { user } = useAuthState();
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
          {...styles}
          justify="space-between"
          align="center"
        >
          <Logo />
          {user && <AccountMenu onSignOut={handleSignOut} mr={3} />}
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
