import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { SideMenuArea } from "@/components/ui/SideMenu/SideMenuArea";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuItem";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { eventmit } from "eventmit";
import { ReactElement, ReactNode, useState } from "react";

type Props<T extends SideMenuName> = {
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

export type SideMenuAnimationEvent = {
  animation: "open" | "close";
  onBefore?: () => void;
  onAfter?: () => void;
};

export const SideMenu = <T extends SideMenuName>({
  items,
  selected,
  onSelectMenu,
  onDeselectMenu,
  defaultWidth,
}: Props<T>): ReactElement => {
  const selectedItem = items.find((item) => item.name === selected);
  const mobileBarWidth = "40px";

  const [animationEmitter, _] = useState(eventmit<SideMenuAnimationEvent>());

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
              animationEmitter={animationEmitter}
            />
          );
        })}
      </Box>

      <SideMenuArea
        selectedItem={selectedItem}
        mobileBarWidth={mobileBarWidth}
        defaultWidth={defaultWidth}
        animationEmitter={animationEmitter}
      />
    </Flex>
  );
};
