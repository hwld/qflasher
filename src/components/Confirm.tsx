import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

type Props = {
  trigger: (onOpen: () => void) => ReactNode;
  title: ReactNode;
  body: ReactNode;
  applyText?: string;
  cancelText?: string;
  onApply: () => void;
};

export const Confirm: React.VFC<Props> = ({
  trigger,
  title,
  body,
  applyText = "はい",
  cancelText = "いいえ",
  onApply,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      {trigger(onOpen)}
      <AlertDialog
        leastDestructiveRef={ref}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogBody>{body}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={ref} onClick={onClose}>
                {cancelText}
              </Button>
              <Button ml={3} colorScheme="red" onClick={onApply}>
                {applyText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
