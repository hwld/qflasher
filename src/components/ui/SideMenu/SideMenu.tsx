import { ResizableBox } from "@/components/ui/ResizableBox";
import { SideMenuItem } from "@/components/ui/SideMenu";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

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

  return (
    <Flex>
      <Box
        w={{ base: "40px", md: "60px" }}
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
      {selectedItem ? (
        <ResizableBox width={contentWidth} onChangeWidth={onChangeContentWitdh}>
          {selectedItem.content}
        </ResizableBox>
      ) : null}
    </Flex>
  );
};
