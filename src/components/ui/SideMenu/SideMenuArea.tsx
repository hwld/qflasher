import { FullWidthSideArea } from "@/components/ui/SideMenu/FullWidthSideArea";
import { ResizableSideArea } from "@/components/ui/SideMenu/ResizableSideArea";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

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
  const [width, setWidth] = useState(defaultWidth);
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
        <ResizableSideArea initialWidth={width} onChangeWidht={setWidth}>
          {selectedItem.content}
        </ResizableSideArea>
      );
    }
    default: {
      return null;
    }
  }
};
