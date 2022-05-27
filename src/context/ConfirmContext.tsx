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
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
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
export const ConfirmProvider: React.FC = ({ children }) => {
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

  const ref = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setConfirmState((s) => ({ ...s, isOpen: false }));
  }, []);

  const handleApply = useCallback(() => {
    handleClose();
    onContinue();
  }, [handleClose, onContinue]);

  const stopPropagation = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const value = useMemo(() => ({ setConfirmState }), []);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <AlertDialog
        leastDestructiveRef={ref}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        // Escでcloseしたときにはfocusを戻したいが、そういうpropsはなさそう？
        // onEscで自分で処理するしかないのかな？
        returnFocusOnClose={false}
      >
        <AlertDialogOverlay
          onClick={stopPropagation}
          onMouseDown={stopPropagation}
          onMouseUp={stopPropagation}
          onTouchStart={stopPropagation}
          onTouchEnd={stopPropagation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogBody>{body}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={ref} aria-label="cancel" onClick={handleClose}>
                {cancelText}
              </Button>
              <Button
                ml={3}
                colorScheme="red"
                aria-label="continue"
                onClick={handleApply}
              >
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
