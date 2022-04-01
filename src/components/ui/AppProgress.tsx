import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from "@chakra-ui/react";
import React from "react";

type Props = ChakraProgressProps;

export const AppProgress: React.FC<Props> = ({ ...styles }) => {
  return (
    <ChakraProgress sx={{ "& > div": { transition: "inherit" } }} {...styles} />
  );
};
