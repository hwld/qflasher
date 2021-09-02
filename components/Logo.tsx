/* eslint-disable @next/next/no-img-element */
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  return (
    <Flex padding={2} align="center">
      <img alt="logo" src="/icon.png" width={96} height={44} />
      <Text ml={3} fontSize="4xl" fontWeight="bold">
        Qflasher
      </Text>
    </Flex>
  );
};

export const Logo = Component;
