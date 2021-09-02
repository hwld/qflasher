import { Flex } from "@chakra-ui/react";
import React from "react";
import { Logo } from "./Logo";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  return (
    <Flex h="80px">
      <Logo />
    </Flex>
  );
};

export const Header = Component;
