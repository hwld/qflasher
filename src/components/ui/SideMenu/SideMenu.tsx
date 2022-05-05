import { SideMenuArea } from "@/components/ui/SideMenu/SideMenuArea";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuItem";
import { AppKeyframes } from "@/types";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ReactElement, ReactNode, useState } from "react";

type Props<T extends string> = {
  items: {
    name: T;
    label: string;
    icon: React.ElementType;
    content: ReactNode;
  }[];
  selected: T;
  onSelectMenu: (name: T) => void;
  onDeselectMenu: () => void;
  defaultWidth?: number;
};

export const SideMenu = <T extends string>({
  items,
  selected,
  onSelectMenu,
  onDeselectMenu,
  defaultWidth,
}: Props<T>): ReactElement => {
  const selectedItem = items.find((item) => item.name === selected);
  const mobileBarWidth = "40px";

  const [animationEvents, setAnimationEvents] = useState<
    { keyframe: AppKeyframes; onAfter: () => void; onBefore: () => void }[]
  >([]);

  return (
    <Flex position={"relative"}>
      <Box
        w={{ base: mobileBarWidth, md: "50px" }}
        h="100%"
        bgColor="gray.600"
        boxShadow="xl"
        // FullWidthSideAreaのzindexよりも大きい値にする
        zIndex={"popover"}
      >
        {items.map((item, i) => {
          return (
            <SideMenuItem
              key={i}
              name={item.name}
              label={item.label}
              icon={item.icon}
              selected={selected === item.name}
              onSelect={onSelectMenu}
              onDeselect={onDeselectMenu}
            />
          );
        })}
      </Box>

      <SideMenuArea
        selectedItem={selectedItem}
        mobileBarWidth={mobileBarWidth}
        defaultWidth={defaultWidth}
      />
    </Flex>
  );
};
