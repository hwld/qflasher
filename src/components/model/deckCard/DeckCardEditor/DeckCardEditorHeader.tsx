import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { MdDelete, MdDragHandle } from "react-icons/md";

type Props = {
  index: number;
  onDeleteEditor: () => void;
  dragHandle?: DraggableProvidedDragHandleProps;
};

export const CardEditorHeader: React.FC<Props> = ({
  index,
  onDeleteEditor,
  dragHandle,
}) => {
  return (
    <Flex>
      <Text flex={1} fontWeight="bold" mr={2}>
        {index + 1}.
      </Text>
      {dragHandle && (
        <Flex flex={1} justify="center">
          <Box
            bgColor="gray.500"
            w="100px"
            h="25px"
            rounded="md"
            {...dragHandle}
          >
            <MdDragHandle size="100%" />
          </Box>
        </Flex>
      )}
      <Flex flex={1} justify="flex-end">
        <Tooltip label="削除">
          <Button
            ml={5}
            boxSize="40px"
            rounded="full"
            minW="unset"
            variant="solid"
            onClick={onDeleteEditor}
            p={0}
          >
            <MdDelete size="60%" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
