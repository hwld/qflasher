import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { DeckCardButton } from "./DeckCardButton";

type Props = { onDelete: () => void } & ButtonProps;

export const DeleteDeckButton: React.FC<Props> = ({ onDelete, ...styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DeckCardButton label="削除" onClick={handleOpen}>
        <MdDelete size="60%" />
      </DeckCardButton>
      <AlertDialog
        leastDestructiveRef={ref}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>暗記帳の削除</AlertDialogHeader>
            <AlertDialogBody>
              <Text>削除すると元に戻すことはできません。</Text>
              <Text>それでも削除しますか？</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={ref} onClick={handleClose}>
                キャンセル
              </Button>
              <Button ml={3} colorScheme="red" onClick={onDelete}>
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
