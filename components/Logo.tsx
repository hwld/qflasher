/* eslint-disable @next/next/no-img-element */
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const Logo: React.FC<Props> = ({}) => {
  return (
    <Flex padding={2} align="center">
      <img alt="logo" src="/icon.png" width={43} height={22} />
      <Text ml={3} fontSize="4xl" fontWeight="bold">
        Qflasher
      </Text>
    </Flex>
  );
};
