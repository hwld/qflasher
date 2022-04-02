import { GoogleIcon } from "@/components/model/user/SignInForm/GoogleIcon";
import { SignInButton } from "@/components/model/user/SignInForm/SignInButton";
import { ButtonProps } from "@chakra-ui/button";
import React from "react";

type Props = {} & ButtonProps;

export const GoogleSignInButton: React.FC<Props> = ({ ...props }) => {
  return (
    <SignInButton
      icon={<GoogleIcon />}
      bgColor="#4285F4"
      _hover={{ bgColor: "#3275E4" }}
      _active={{ bgColor: "#2265D4" }}
      {...props}
    >
      Sign in with Google
    </SignInButton>
  );
};
