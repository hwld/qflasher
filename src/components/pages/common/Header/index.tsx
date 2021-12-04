import { Box, Flex, FlexProps, Progress } from "@chakra-ui/react";
import React from "react";
import { auth } from "../../../../firebase/config";
import { useAuthState } from "../../../../hooks/useAuthState";
import { Link } from "../../../Link";
import { AccountMenu } from "./AccountMenu";
import { Logo } from "./Logo";
import { useHeaderStyle } from "./useHeaderStyle";

type Props = { isLoading?: boolean; size: "sm" | "md" } & FlexProps;

export const Header: React.FC<Props> = ({ isLoading, size, ...styles }) => {
  const { user } = useAuthState();
  const { barHeight, progressHeight, logoWidth, accountIconSize } =
    useHeaderStyle(size);

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
          bgGradient="linear(to-r, green.400 70%, green.500)"
          w="100vw"
          h={`${barHeight}px`}
          justify="space-between"
          align="center"
          pr={{ base: 3, md: 5 }}
          pl={{ base: 1, md: 5 }}
          {...styles}
        >
          <Link href="/decks">
            <Logo w={`${logoWidth}px`} />
          </Link>
          {user && (
            <AccountMenu
              onSignOut={handleSignOut}
              boxSize={`${accountIconSize}px`}
            />
          )}
        </Flex>
        <Progress
          colorScheme="green"
          height={`${progressHeight}px`}
          isIndeterminate={isLoading}
        />
      </Box>
      <Box h={`${barHeight + progressHeight}px`} flexShrink={0} />
    </>
  );
};
