import { Image, ImageProps } from "@chakra-ui/react";
import React from "react";

type Props = ImageProps;

export const AppLogo: React.FC<Props> = ({ ...styles }) => {
  return <Image alt="logo" fallback={<></>} src="/logo.svg" {...styles} />;
};
