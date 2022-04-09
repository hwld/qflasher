import { SideMenuArea } from "@/components/ui/SideMenu/SideMenuArea";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuItem";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

type Props<T extends string> = {
  items: {
    name: T;
    label: string;
    icon: React.ElementType;
    content: ReactNode;
  }[];
  selected: T;
  onSelect: (name: T) => void;
};

export const SideMenu = <T extends string>({
  items,
  selected,
  onSelect,
}: Props<T>): ReactElement => {
  const selectedItem = items.find((item) => item.name === selected);
  const mobileBarWidth = "40px";

  return (
    <Flex position={"relative"}>
      <Box
        w={{ base: mobileBarWidth, md: "50px" }}
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
      <SideMenuArea
        selectedItem={selectedItem}
        mobileBarWidth={mobileBarWidth}
      />
    </Flex>
  );
};
