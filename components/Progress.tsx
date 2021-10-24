import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

type Props = ChakraProgressProps;

const Component: React.FC<Props> = ({ ...styles }) => {
  return <ChakraProgress {...styles} />;
};

export const Progress = styled(Component)`
  & > div {
    transition: inherit;
  }
`;
