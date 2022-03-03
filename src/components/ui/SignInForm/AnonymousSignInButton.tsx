import { Button, ButtonProps, Flex, Icon, Text } from "@chakra-ui/react";
import { FaUserSecret } from "react-icons/fa";

export const AnonymousSignInButton: React.VFC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      {...props}
      role="group"
      rounded="md"
      bgColor="gray.300"
      _hover={{ bgColor: "gray.400" }}
      _active={{ bgColor: "gray.500" }}
      display="flex"
      justifyContent="space-between"
      padding={0}
      paddingRight={2}
      w="200px"
      boxShadow={"lg"}
    >
      <Flex
        boxSize="40px"
        justify="center"
        align="center"
        borderLeftRadius="inherit"
      >
        <Icon as={FaUserSecret} boxSize="60%" fill="gray.700" />
      </Flex>
      <Text ml={2} color="gray.800" fontSize="sm" fontWeight="bold">
        ゲストとしてログイン
      </Text>
    </Button>
  );
};
