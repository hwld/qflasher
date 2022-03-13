import { AppLogo } from "@/components/ui/AppLogo";
import { AccountMenu, useHeaderStyle } from "@/components/ui/Header";
import { SignInForm } from "@/components/ui/SignInForm";
import { useAuthState } from "@/hooks/useAuthState";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = { isLoading?: boolean; size: "sm" | "md" } & FlexProps;

export const Header: React.FC<Props> = ({ isLoading, size, ...styles }) => {
  const { userResult } = useAuthState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { barHeight, progressHeight, logoWidth, accountIconSize } =
    useHeaderStyle(size);
  const formSize = useBreakpointValue({ base: "xs", md: "md" } as const);
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" } as const);

  return (
    <>
      <Box position="fixed" zIndex="sticky">
        <Flex
          bgGradient="linear(to-r, green.400 70%, green.500)"
          w="100vw"
          h={`${barHeight}px`}
          justify="space-between"
          align="center"
          pr={{ base: 3, md: 5 }}
          pl={{ base: 1, md: 5 }}
          {...styles}
        >
          <Link href="/">
            <AppLogo w={`${logoWidth}px`} />
          </Link>
          {userResult.data ? (
            <AccountMenu
              boxSize={`${accountIconSize}px`}
              user={userResult.data}
            />
          ) : (
            <Button
              size={buttonSize}
              bgColor={"orange.300"}
              _hover={{ bgColor: "orange.400" }}
              _active={{ bgColor: "orange.500" }}
              color="gray.700"
              onClick={() => onOpen()}
            >
              ログイン
            </Button>
          )}
          <Modal isOpen={isOpen} onClose={onClose} size={formSize}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
              <ModalCloseButton color={"white"} size="lg" />
              <SignInForm />
            </ModalContent>
          </Modal>
        </Flex>
        <Progress
          hasStripe
          colorScheme="orange"
          height={`${progressHeight}px`}
          isIndeterminate={isLoading}
        />
      </Box>
      <Box h={`${barHeight + progressHeight}px`} flexShrink={0} />
    </>
  );
};
