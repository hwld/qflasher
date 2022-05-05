import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { SideMenuAnimationEvent } from "@/components/ui/SideMenu/SideMenu";
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { Eventmitter } from "eventmit";
import React, { useCallback } from "react";

type Props<T extends SideMenuName> = {
  name: T;
  label: string;
  icon: React.ElementType;
  selected: boolean;
  onSelect: (name: T) => void;
  onDeselect: () => void;
  animationEmitter: Eventmitter<SideMenuAnimationEvent>;
};

export const SideMenuItem = <T extends SideMenuName>({
  selected,
  icon,
  name,
  label,
  onSelect,
  onDeselect,
  animationEmitter,
}: Props<T>) => {
  const select = useCallback(() => {
    onSelect(name);
  }, [name, onSelect]);

  const handleClickSelect = useCallback(() => {
    animationEmitter.emit({ animation: "open", onBefore: select });
  }, [animationEmitter, select]);

  const handleClickDeselect = useCallback(() => {
    animationEmitter.emit({ animation: "close", onAfter: onDeselect });
  }, [animationEmitter, onDeselect]);

  const handleClick = () => {
    if (selected) {
      handleClickDeselect();
    } else {
      handleClickSelect();
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
