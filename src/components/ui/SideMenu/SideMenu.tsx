import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ResizableBox } from "../ResizableBox";
import { SideMenuItem } from "./SideMenuItem";

type Props<T extends string> = {
  items: { name: T; icon: React.ElementType; content: ReactNode }[];
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

  return (
    <Flex>
      <Box w="60px" h="100%" bgColor="gray.600" boxShadow="xl">
        {items.map((item, i) => {
          return (
            <SideMenuItem
              key={i}
              name={item.name}
              icon={item.icon}
              selected={selected === item.name}
              onSelect={onSelect}
            />
          );
        })}
      </Box>
      {selectedItem ? (
        <ResizableBox width={contentWidth} onChangeWidth={onChangeContentWitdh}>
          {selectedItem.content}
        </ResizableBox>
      ) : null}
    </Flex>
  );
};
