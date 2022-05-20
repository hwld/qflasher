import { SideMenuName } from "@/components/pages/MyDeckListPage/MyDeckListPage";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuArea";
import { useSideMenuAnimation } from "@/components/ui/SideMenu/useSideMenuAnimation";
import { Box, keyframes } from "@chakra-ui/react";
import React, { useMemo } from "react";

type Props<T extends SideMenuName> = {
  sideMenuWidth: string;
  selectedItem: SideMenuItem<T> | undefined;
};

export const FullWidthSideArea = <T extends SideMenuName>({
  selectedItem,
  sideMenuWidth,
}: Props<T>) => {
  const close = useMemo(() => {
    return keyframes`
      to { width: 0px; }
    `;
  }, []);
  const open = useMemo(() => {
    return keyframes`
      from { width: 0px; }
      to { width: calc(100vw - ${sideMenuWidth}); }
    `;
  }, [sideMenuWidth]);

  const { props, item } = useSideMenuAnimation({ open, close, selectedItem });

  return item.isOpen ? (
    <Box
      bgColor={"gray.700"}
      position="absolute"
      zIndex="modal"
      left={sideMenuWidth}
      w={`calc(100vw - ${sideMenuWidth})`}
      h="100%"
      {...props}
    >
      {item.content}
    </Box>
  ) : null;
};
