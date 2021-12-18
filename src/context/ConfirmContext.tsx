import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const ConfirmContext = createContext<{
  setConfirmState: Dispatch<SetStateAction<ConfirmState>>;
}>({ setConfirmState: () => {} });

type ConfirmState = {
  isOpen: boolean;
  title: ReactNode;
  body: ReactNode;
  continueText: string;
  cancelText: string;
  onContinue: () => void;
};
export const ConfirmContextProvider: React.FC = ({ children }) => {
  const [
    { isOpen, title, body, continueText, cancelText, onContinue },
    setConfirmState,
  ] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    body: "",
    continueText: "",
    cancelText: "",
    onContinue: () => {},
  });

  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => {
    setConfirmState((s) => ({ ...s, isOpen: false }));
  }, []);

  const handleApply = useCallback(() => {
    handleClose();
    onContinue();
  }, [handleClose, onContinue]);

  return (
    <ConfirmContext.Provider value={{ setConfirmState: setConfirmState }}>
      {children}
      <AlertDialog
        leastDestructiveRef={ref}
        isOpen={isOpen}
        onClose={handleClose}
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
              <Button ref={ref} onClick={handleClose}>
                {cancelText}
              </Button>
              <Button ml={3} colorScheme="red" onClick={handleApply}>
                {continueText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const { setConfirmState: setConfirmState } = useContext(ConfirmContext);

  const confirm = useCallback(
    (arg: Omit<ConfirmState, "isOpen">) => {
      setConfirmState({ ...arg, isOpen: true });
    },
    [setConfirmState]
  );

  return confirm;
};
