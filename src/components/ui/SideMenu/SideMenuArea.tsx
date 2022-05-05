import { FullWidthSideArea } from "@/components/ui/SideMenu/FullWidthSideArea";
import { ResizableSideArea } from "@/components/ui/SideMenu/ResizableSideArea";
import { useBreakpointValue } from "@chakra-ui/react";
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
  defaultWidth?: number;
};

export const SideMenuArea = <T extends string>({
  selectedItem,
  mobileBarWidth,
  defaultWidth = 300,
}: Props<T>): ReturnType<React.VFC> => {
  const breakPoint = useBreakpointValue({ base: "base", md: "md" } as const);

  if (!selectedItem) {
    return null;
  }

  switch (breakPoint) {
    case "base": {
      return (
        <FullWidthSideArea sideMenuWidth={mobileBarWidth}>
          {selectedItem.content}
        </FullWidthSideArea>
      );
    }
    case "md": {
      return (
        <ResizableSideArea initialWidth={defaultWidth}>
          {selectedItem.content}
        </ResizableSideArea>
      );
    }
    default: {
      return null;
    }
  }
};
