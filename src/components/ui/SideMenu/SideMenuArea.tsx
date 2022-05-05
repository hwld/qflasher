import { FullWidthSideArea } from "@/components/ui/SideMenu/FullWidthSideArea";
import { ResizableSideArea } from "@/components/ui/SideMenu/ResizableSideArea";
import { SideMenuAnimationEvent } from "@/components/ui/SideMenu/SideMenu";
import { useBreakpointValue } from "@chakra-ui/react";
import { Eventmitter } from "eventmit";
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
  animationEmitter: Eventmitter<SideMenuAnimationEvent>;
};

export const SideMenuArea = <T extends string>({
  selectedItem,
  mobileBarWidth,
  defaultWidth = 300,
  animationEmitter,
}: Props<T>): ReturnType<React.VFC> => {
  const [width, setWidth] = useState(defaultWidth);
  const breakPoint = useBreakpointValue({ base: "base", md: "md" } as const);

  switch (breakPoint) {
    case "base": {
      return (
        <FullWidthSideArea
          sideMenuWidth={mobileBarWidth}
          animationEmitter={animationEmitter}
          selected={selectedItem !== undefined}
        >
          {selectedItem && selectedItem.content}
        </FullWidthSideArea>
      );
    }
    case "md": {
      return (
        <ResizableSideArea
          selected={selectedItem !== undefined}
          initialWidth={width}
          onChangeWidht={setWidth}
          animationEmitter={animationEmitter}
        >
          {selectedItem && selectedItem.content}
        </ResizableSideArea>
      );
    }
    default: {
      return null;
    }
  }
};
