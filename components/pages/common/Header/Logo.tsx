/* eslint-disable @next/next/no-img-element */
import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import React from "react";

type Props = FlexProps;

export const Logo: React.FC<Props> = ({ ...styles }) => {
  return (
    <Flex padding={2} align="center" {...styles}>
      <img alt="logo" src="/icon.png" width={70} />
      <Heading size="lg" ml={2} fontWeight="bold" userSelect="none">
        Qflasher
      </Heading>
    </Flex>
  );
};
