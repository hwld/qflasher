import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { FullWidthSideArea } from "@/components/ui/SideMenu/FullWidthSideArea";
import { ResizableSideArea } from "@/components/ui/SideMenu/ResizableSideArea";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export type SideMenuItem<T extends SideMenuName> = {
  name: T;
  label: string;
  icon: React.ElementType;
  content: ReactNode;
};

type Props<T extends SideMenuName> = {
  selectedItem: SideMenuItem<T> | undefined;
  mobileBarWidth: string;
  defaultWidth?: number;
};

export const SideMenuArea = <T extends SideMenuName>({
  selectedItem,
  mobileBarWidth,
  defaultWidth = 300,
}: Props<T>): ReturnType<React.VFC> => {
  const breakPoint = useBreakpointValue({ base: "base", md: "md" } as const);

  switch (breakPoint) {
    case "base": {
      return (
        <FullWidthSideArea
          selectedItem={selectedItem}
          sideMenuWidth={mobileBarWidth}
        />
      );
    }
    case "md": {
      return (
        <ResizableSideArea
          selectedItem={selectedItem}
          defaultWidth={defaultWidth}
        />
      );
    }
    default: {
      return null;
    }
  }
};
