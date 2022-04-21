import { SignInButton } from "@/components/model/user/SignInForm/SignInButton";
import { ButtonProps, Icon } from "@chakra-ui/react";
import { FaUserSecret } from "react-icons/fa";

export const AnonymousSignInButton: React.VFC<ButtonProps> = ({ ...props }) => {
  return (
    <SignInButton
      icon={<Icon as={FaUserSecret} boxSize="60%" fill="gray.700" />}
      bgColor="gray.300"
      _hover={{ bgColor: "gray.400" }}
      _active={{ bgColor: "gray.500" }}
      textStyles={{ color: "gray.800", fontSize: "sm" }}
      aria-label="anonymous signin"
      {...props}
    >
      ゲストとしてログイン
    </SignInButton>
  );
};
