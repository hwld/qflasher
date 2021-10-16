import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

type Props = ChakraProgressProps;

const Component: React.FC<Props> = ({ ...styleProps }) => {
  return <ChakraProgress {...styleProps} />;
};

export const Progress = styled(Component)`
  & > div {
    transition: inherit;
  }
`;
