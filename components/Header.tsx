import { Box, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { Logo } from "./Logo";

type Props = FlexProps;

const Component: React.FC<Props> = ({ ...styleProps }) => {
  const height = 60;

  return (
    <>
      <Flex
        bgColor="green.400"
        position="fixed"
        w="100vw"
        h={`${height}px`}
        zIndex="1"
        {...styleProps}
      >
        <Logo />
      </Flex>
      <Box h={`${height}px`} />
    </>
  );
};

export const Header = Component;
