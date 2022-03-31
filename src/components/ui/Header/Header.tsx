import { AppLogo } from "@/components/ui/AppLogo";
import { AccountMenu, useHeaderStyle } from "@/components/ui/Header";
import { Link } from "@/components/ui/Link";
import { SignInForm } from "@/components/ui/SignInForm";
import { useHeaderState } from "@/context/HeaderContext";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

type Props = {
  isLoading?: boolean;
  size: "sm" | "md";
} & FlexProps;

export const Header: React.FC<Props> = ({ isLoading, size, ...styles }) => {
  const { userResult } = useAuthState();
  const router = useAppRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    barHeight,
    progressHeight,
    logoWidth,
    accountIconSize,
    formSize,
    signInButtonSize,
  } = useHeaderStyle(size);

  const { showSignInButton } = useHeaderState();

  const signInButton = useMemo(() => {
    return showSignInButton ? (
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
    ) : null;
  }, [showSignInButton, signInButtonSize, onOpen]);

  const userInfo = useMemo(() => {
    if (userResult.status === "loading") {
      return null;
    }

    return userResult.data ? (
      <AccountMenu boxSize={`${accountIconSize}px`} user={userResult.data} />
    ) : (
      signInButton
    );
  }, [accountIconSize, signInButton, userResult.data, userResult.status]);

  const handleBack = () => {
    router.back();
  };

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
          <HStack spacing={{ base: 1, md: 5 }}>
            <IconButton
              // sizeでは幅と高さが異なる場合があるのでboxSizeで指定する
              boxSize={{ base: "8", md: "12" }}
              minW={0}
              flexGrow={0}
              icon={
                <Icon
                  as={MdOutlineArrowBackIosNew}
                  boxSize="80%"
                  color={"gray.100"}
                />
              }
              aria-label="戻る"
              onClick={handleBack}
            />
            <Link _hover={{ opacity: 0.7 }} href={routes.rootPage}>
              <AppLogo width={`${logoWidth}px`} />
            </Link>
          </HStack>
          {userInfo}
        </Flex>
        <Progress
          hasStripe
          colorScheme="orange"
          height={`${progressHeight}px`}
          isIndeterminate={isLoading}
        />
      </Box>
      <Box h={`${barHeight + progressHeight}px`} flexShrink={0} />
      <Modal isOpen={isOpen} onClose={onClose} size={formSize}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalCloseButton color={"white"} size="lg" />
          <SignInForm afterSignIn={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
