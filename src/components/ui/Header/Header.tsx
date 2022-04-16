import { AppLogo } from "@/components/ui/AppLogo";
import { AppProgress } from "@/components/ui/AppProgress";
import { HeaderActions } from "@/components/ui/Header/HeaderActions";
import { useHeaderStyle } from "@/components/ui/Header/useHeaderStyle";
import { Link } from "@/components/ui/Link";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

type Props = {
  loading?: boolean;
  isSignInButtonHidden?: boolean;
  size: "sm" | "md";
} & FlexProps;

export const Header: React.FC<Props> = ({
  loading,
  isSignInButtonHidden = false,
  size,
  ...styles
}) => {
  const router = useAppRouter();
  const { barHeight, progressHeight, logoWidth, userIconSize } =
    useHeaderStyle(size);

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
          <HeaderActions
            userIconSize={userIconSize}
            isSignInButtonHidden={isSignInButtonHidden}
          />
        </Flex>
        <AppProgress
          hasStripe
          colorScheme="orange"
          height={`${progressHeight}px`}
          isIndeterminate={loading}
        />
      </Box>
      <Box h={`${barHeight + progressHeight}px`} flexShrink={0} />
    </>
  );
};
