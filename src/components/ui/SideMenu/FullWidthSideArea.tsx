import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = { sideMenuWidth: string; children: ReactNode };

export const FullWidthSideArea: React.VFC<Props> = ({
  sideMenuWidth,
  children,
}) => {
  return (
    <Box
      bgColor={"gray.700"}
      position="absolute"
      zIndex="modal"
      left={sideMenuWidth}
      w={`calc(100vw - ${sideMenuWidth})`}
      animation={`${close} ease-out 400ms`}
      h="100%"
      overflow={"hidden"}
      wordBreak="keep-all"
      style={{ animationFillMode: "forwards" }}
    >
      {children}
    </Box>
  );
};
