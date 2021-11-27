import { Box, Flex } from "@chakra-ui/layout";
import { As, Button, Icon } from "@chakra-ui/react";
import React from "react";

type Props = { selected: boolean; icon: As; onClick: () => void };

export const SideMenuItem: React.FC<Props> = ({ selected, icon, onClick }) => {
  return (
    <Flex mt={3}>
      <Box w="3px" bgColor={selected ? "green.300" : "transparent"}></Box>
      <Flex justifyContent="center" w="100%">
        <Button
          role="group"
          rounded="full"
          bgColor="blackAlpha.400"
          boxSize="50px"
          p={0}
          minH="auto"
          minW="auto"
          onClick={onClick}
        >
          <Icon
            as={icon}
            boxSize="60%"
            color={selected ? "gray.50" : "gray.400"}
            _groupHover={{ color: "gray.50" }}
          />
        </Button>
      </Flex>
    </Flex>
  );
};