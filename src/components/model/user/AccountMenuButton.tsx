import { UserIcon } from "@/components/model/user/UserIcon";
import { Button, MenuButton, MenuButtonProps } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { forwardRef } from "react";

type Props = { user: User } & MenuButtonProps;

export const AccountMenuButton = forwardRef<HTMLButtonElement, Props>(
  function Component({ user, ...styles }, ref) {
    return (
      <MenuButton
        ref={ref}
        sx={{
          "& > span": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        as={Button}
        color="gray.700"
        rounded="full"
        bgColor="gray.200"
        _hover={{ bgColor: "gray.300" }}
        _active={{ bgColor: "gray.400" }}
        minW="none"
        p={0}
        {...styles}
      >
        <UserIcon user={user} />
      </MenuButton>
    );
  }
);
