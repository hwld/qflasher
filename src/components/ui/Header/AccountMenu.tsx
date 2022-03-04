import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAuthState } from "@/hooks/useAuthState";
import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdExitToApp, MdNoAccounts } from "react-icons/md";

type Props = {} & MenuButtonProps;

export const AccountMenu: React.FC<Props> = ({ ...styles }) => {
  const { signOut, deleteUser } = useAuthState();

  const handleSignOut = useAppOperation(signOut);

  const confirm = useConfirm();
  const deleteOperation = useAppOperation(deleteUser);
  const handleUserDelete = () => {
    confirm({
      onContinue: deleteOperation,
      title: "アカウントの削除",
      body: "アカウントを削除しますか？",
      cancelText: "キャンセル",
      continueText: "削除",
    });
  };

  return (
    <Menu>
      <Tooltip label="アカウント">
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
      </Tooltip>

      <MenuList>
        <MenuItem closeOnSelect={false} fontWeight="bold" fontSize={"xl"}>
          hwld
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<MdExitToApp size={"20px"} />} onClick={handleSignOut}>
          ログアウト
        </MenuItem>
        <MenuItem
          icon={<MdNoAccounts size="20px" />}
          onClick={handleUserDelete}
        >
          アカウントを削除する
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
