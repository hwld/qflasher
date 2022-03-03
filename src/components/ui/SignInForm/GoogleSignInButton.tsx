import { GoogleIcon } from "@/components/ui/SignInForm";
import { Button, ButtonProps } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

type Props = {} & ButtonProps;

export const GoogleSignInButton: React.FC<Props> = ({ ...props }) => {
  return (
    <Button
      {...props}
      role="group"
      rounded="md"
      bgColor="#4285F4"
      _hover={{ bgColor: "#3275E4" }}
      _active={{ bgColor: "#2265D4" }}
      display="flex"
      justifyContent="space-between"
      padding={0}
      paddingRight={2}
      w="200px"
    >
      <Flex
        bgColor="gray.50"
        boxSize={"40px"}
        justify="center"
        align="center"
        borderLeftRadius="inherit"
        _groupHover={{ bgColor: "gray.100" }}
        _groupActive={{ bgColor: "gray.200" }}
      >
        <GoogleIcon />
      </Flex>
      <Text ml={2} color="gray.50">
        Sign in with Google
      </Text>
    </Button>
  );
};
