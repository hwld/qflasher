import { Image, ImageProps } from "@chakra-ui/react";
import React from "react";

type Props = ImageProps;

export const Logo: React.FC<Props> = ({ ...styles }) => {
  return <Image alt="logo" src="/logo.svg" {...styles} />;
};
