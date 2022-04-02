import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export const SignInButton: React.VFC<
  ButtonProps & {
    children: string;
    icon: ReactNode;
    iconStyles?: FlexProps;
    textStyles?: TextProps;
  }
> = ({ children, icon, iconStyles, textStyles, ...styles }) => {
  return (
    <Button
      role="group"
      rounded="md"
      display="flex"
      justifyContent="space-between"
      padding={0}
      minW="200px"
      {...styles}
    >
      <Flex
        boxSize={"40px"}
        justify="center"
        align="center"
        borderLeftRadius="inherit"
        bgColor="gray.50"
        _groupHover={{ bgColor: "gray.100" }}
        _groupActive={{ bgColor: "gray.200" }}
        {...iconStyles}
      >
        {icon}
      </Flex>
      <Text mx="auto" color="gray.50" {...textStyles}>
        {children}
      </Text>
    </Button>
  );
};
