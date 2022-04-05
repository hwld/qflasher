import { SignInForm } from "@/components/model/user/SignInForm/SignInForm";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

export const SignInButton: React.VFC = () => {
  const router = useAppRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formSize = useBreakpointValue({ base: "xs", md: "md" } as const);
  const signInButtonSize = useBreakpointValue({
    base: "sm",
    md: "md",
  } as const);

  const handleAfterSignIn = async () => {
    onClose();
    await router.replace(routes.myDecksPage);
  };

  return (
    <>
      <Button
        size={signInButtonSize}
        bgColor={"orange.300"}
        _hover={{ bgColor: "orange.400" }}
        _active={{ bgColor: "orange.500" }}
        color="gray.700"
        onClick={onOpen}
      >
        ログイン
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={formSize}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalCloseButton color={"white"} size="lg" />
          <SignInForm afterSignIn={handleAfterSignIn} />
        </ModalContent>
      </Modal>
    </>
  );
};
