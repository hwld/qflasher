import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";

type Props<T extends SideMenuName> = {
  name: T;
  label: string;
  icon: React.ElementType;
  selected: boolean;
  onSelect: (name: T) => void;
  onDeselect: () => void;
};

export const SideMenuItem = <T extends SideMenuName>({
  selected,
  icon,
  name,
  label,
  onSelect,
  onDeselect,
}: Props<T>) => {
  const handleClick = () => {
    if (selected) {
      onDeselect();
    } else {
      onSelect(name);
    }
  };

  return (
    <Flex mt={3}>
      <Box w="3px" bgColor={selected ? "green.300" : "transparent"}></Box>
      <Flex justifyContent="center" w="100%">
        <Tooltip label={label} placement="bottom-start">
          <Button
            role="group"
            rounded="full"
            bgColor="blackAlpha.400"
            boxSize={{ base: "30px", md: "40px" }}
            p={0}
            minH="auto"
            minW="auto"
            onClick={handleClick}
          >
            <Icon
              as={icon}
              boxSize="60%"
              color={selected ? "gray.50" : "gray.400"}
              _groupHover={{ color: "gray.50" }}
            />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
