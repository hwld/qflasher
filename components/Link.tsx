import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type Props = NextLinkProps & ChakraLinkProps;
export const Link: React.FC<Props> = ({ href, children, ...styles }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink _hover={{ opacity: 0.7 }} {...styles}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
