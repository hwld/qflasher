import { ResizableBox } from "@/components/ui/ResizableBox";
import { useSideMenu } from "@/context/SideMenuContext";
import { useDebounce } from "@/hooks/useDebounce";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props<T> = {
  selectedItem:
    | {
        name: T;
        label: string;
        icon: React.ElementType;
        content: ReactNode;
      }
    | undefined;
  mobileBarWidth: string;
};

export const SideMenuArea = <T extends string>({
  selectedItem,
  mobileBarWidth,
}: Props<T>): ReturnType<React.VFC> => {
  const breakPoint = useBreakpointValue({ base: "base", md: "md" } as const);
  const { storeWidth, initialWidth } = useSideMenu();
  const storeWidthWithDebounce = useDebounce(500, storeWidth);

  if (!selectedItem) {
    return null;
  }

  switch (breakPoint) {
    case "base": {
      return (
        <Box
          bgColor={"gray.700"}
          position="absolute"
          zIndex="modal"
          left={mobileBarWidth}
          w={`calc(100vw - ${mobileBarWidth})`}
          h="100%"
        >
          {selectedItem.content}
        </Box>
      );
    }
    case "md": {
      return (
        <ResizableBox
          initialWidth={initialWidth}
          onChangeWidth={storeWidthWithDebounce}
          bgColor={"gray.700"}
        >
          {selectedItem.content}
        </ResizableBox>
      );
    }
    default: {
      return null;
    }
  }
};
