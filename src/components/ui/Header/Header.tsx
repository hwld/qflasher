import { AppLogo } from "@/components/ui/AppLogo";
import { AccountMenu, useHeaderStyle } from "@/components/ui/Header";
import { useAuthState } from "@/hooks/useAuthState";
import { Box, Flex, FlexProps, Link, Progress } from "@chakra-ui/react";
import React from "react";

type Props = { isLoading?: boolean; size: "sm" | "md" } & FlexProps;

export const Header: React.FC<Props> = ({ isLoading, size, ...styles }) => {
  const { user } = useAuthState();
  const { barHeight, progressHeight, logoWidth, accountIconSize } =
    useHeaderStyle(size);

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
            <AppLogo w={`${logoWidth}px`} />
          </Link>
          {user && <AccountMenu boxSize={`${accountIconSize}px`} />}
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
