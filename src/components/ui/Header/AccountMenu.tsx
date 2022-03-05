import { AccountMenuButton } from "@/components/ui/Header/AccountMenuButton";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAuthState } from "@/hooks/useAuthState";
import {
  Menu,
  MenuButtonProps,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { MdExitToApp, MdNoAccounts } from "react-icons/md";

type Props = { user: User } & MenuButtonProps;

export const AccountMenu: React.FC<Props> = ({ user, ...styles }) => {
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
        <AccountMenuButton user={user} {...styles} />
      </Tooltip>

      <MenuList>
        <MenuItem closeOnSelect={false} fontWeight="bold" fontSize={"xl"}>
          {user.displayName ?? "名無し"}
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
