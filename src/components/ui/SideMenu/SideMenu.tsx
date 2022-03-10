import { ResizableBox } from "@/components/ui/ResizableBox";
import { SideMenuItem } from "@/components/ui/SideMenu";
import { Box } from "@chakra-ui/layout";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";

type Props<T extends string> = {
  items: {
    name: T;
    label: string;
    icon: React.ElementType;
    content: ReactNode;
  }[];
  selected: T;
  contentWidth: number;
  onSelect: (name: T) => void;
  onChangeContentWitdh: (w: number) => void;
};

export const SideMenu = <T extends string>({
  items,
  selected,
  onSelect,
  contentWidth,
  onChangeContentWitdh,
}: Props<T>) => {
  const selectedItem = items.find((item) => item.name === selected);
  const mobileBarWidth = "40px";
  // useBreakPointを使用するとbaseとmd以外のサイズも渡ってくるので制限するためにこっちを使う
  const breakPoint = useBreakpointValue({ base: "base", md: "md" } as const);

  const sideMenuArea = useMemo(() => {
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
            width={contentWidth}
            onChangeWidth={onChangeContentWitdh}
          >
            {selectedItem.content}
          </ResizableBox>
        );
      }
    }
  }, [breakPoint, contentWidth, onChangeContentWitdh, selectedItem]);

  return (
    <Flex position={"relative"}>
      <Box
        w={{ base: mobileBarWidth, md: "60px" }}
        h="100%"
        bgColor="gray.600"
        boxShadow="xl"
      >
        {items.map((item, i) => {
          return (
            <SideMenuItem
              key={i}
              name={item.name}
              label={item.label}
              icon={item.icon}
              selected={selected === item.name}
              onSelect={onSelect}
            />
          );
        })}
      </Box>
      {sideMenuArea}
    </Flex>
  );
};
