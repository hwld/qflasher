import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { FaUser } from "react-icons/fa";

type Props = { onSignOut: () => Promise<void> } & MenuButtonProps;

export const AccountMenu: React.FC<Props> = ({ onSignOut, ...styles }) => {
  return (
    <Menu>
      <MenuIconButton
        as={Button}
        color="gray.700"
        rounded="full"
        bgColor="gray.200"
        _hover={{ bgColor: "gray.300" }}
        _active={{ bgColor: "gray.400" }}
        boxSize="40px"
        p={0}
        {...styles}
      >
        <FaUser size="50%" />
      </MenuIconButton>

      <MenuList>
        <MenuItem onClick={onSignOut}>ログアウト</MenuItem>
      </MenuList>
    </Menu>
  );
};

const MenuIconButton = styled(MenuButton)`
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
