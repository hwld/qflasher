import { Box, Flex, FlexProps, Progress } from "@chakra-ui/react";
import React from "react";
import { auth } from "../../../../firebase/config";
import { useAuthState } from "../../../../hooks/useAuthState";
import { Link } from "../../../Link";
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
          justify="space-between"
          align="center"
          pr={{ base: 3, md: 5 }}
          pl={{ base: 1, md: 5 }}
          {...styles}
        >
          <Link href="/decks">
            <Logo />
          </Link>
          {user && <AccountMenu onSignOut={handleSignOut} />}
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
