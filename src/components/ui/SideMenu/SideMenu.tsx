import { Box } from "@chakra-ui/layout";
import { SideMenuItem } from "./SideMenuItem";

type Props<T extends string> = {
  items: { icon: React.ElementType; name: T }[];
  selected: T;
  onSelect: (name: T) => void;
};

export const SideMenu = <T extends string>({
  items,
  selected,
  onSelect,
}: Props<T>) => {
  return (
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
  );
};
