import { ChakraProps, css, WithCSSVar } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

export const chakraPropsToCss = (
  theme: WithCSSVar<Dict<any>>,
  style: ChakraProps | undefined
) => {
  if (!style) return {};
  return css(style)(theme);
};
