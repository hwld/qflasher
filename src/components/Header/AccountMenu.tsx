import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";

type Props = { onSignOut: () => Promise<void> } & MenuButtonProps;

export const AccountMenu: React.FC<Props> = ({ onSignOut, ...styles }) => {
  return (
    <Menu>
      <MenuButton
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
        boxSize="40px"
        p={0}
        {...styles}
      >
        <FaUser size="50%" />
      </MenuButton>

      <MenuList>
        <MenuItem onClick={onSignOut}>ログアウト</MenuItem>
      </MenuList>
    </Menu>
  );
};
