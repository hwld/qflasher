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
import { ReactNode, useMemo, useRef } from "react";

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

  const triggerComponent = useMemo(() => {
    return trigger(onOpen);
  }, [onOpen, trigger]);

  return (
    <>
      {triggerComponent}
      <AlertDialog
        leastDestructiveRef={ref}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
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
