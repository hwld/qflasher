/* eslint-disable @next/next/no-img-element */
import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const Logo: React.FC<Props> = ({}) => {
  return (
    <Flex padding={2} align="center">
      <img alt="logo" src="/icon.png" width={50} />
      <Heading ml={3} fontWeight="bold">
        Qflasher
      </Heading>
    </Flex>
  );
};
