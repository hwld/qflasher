import Icon from "@chakra-ui/icon";
import { Box, Flex, ListItem, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { SyntheticEvent } from "hoist-non-react-statics/node_modules/@types/react";
import React, { useState } from "react";
import { AiFillTag } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { Tag } from "../../types";
import { EditableTagName } from "./EditableTagName";

type Props = {
  tag: Tag;
  onSelect: (id: string) => void;
  selected: boolean;
  updateTag: (tag: Tag) => void;
  deleteTag: (id: string) => void;
};

export const TagListItem: React.FC<Props> = ({
  tag,
  onSelect,
  selected,
  updateTag,
  deleteTag,
}) => {
  const [editable, setEditable] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };
  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleItemClick = () => {
    onSelect(tag.id);
  };

  const handleEditClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setEditable(true);
  };

  const handleCompleteUpdate = (tagName: string) => {
    updateTag({ ...tag, name: tagName });
    setEditable(false);
  };

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    deleteTag(tag.id);
  };

  return (
    <ListItem
      rounded="md"
      key={tag.id}
      aria-selected={selected}
      mx={1}
      _selected={{ bgColor: "whiteAlpha.400" }}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex
        rounded="md"
        p={1}
        align="center"
        _hover={{ bgColor: "whiteAlpha.300" }}
        // 子要素がクリックされたときにactiveが適用されないようにする
        sx={{ "&:active:not(:focus-within)": { bgColor: "whiteAlpha.200" } }}
        onClick={handleItemClick}
      >
        <Icon as={AiFillTag} mr={2} />
        {editable ? (
          <EditableTagName
            defaultTagName={tag.name}
            onComplete={handleCompleteUpdate}
          />
        ) : (
          <>
            <Text
              flexGrow={1}
              userSelect="none"
              color={selected ? "gray.50" : "gray.300"}
              fontWeight="bold"
              fontSize="sm"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {tag.name}
            </Text>
            {isMouseOver ? (
              <Flex flexShrink={0}>
                <Button
                  rounded="md"
                  boxSize="30px"
                  minW="none"
                  mr={1}
                  p={0}
                  variant="outline"
                  onClick={handleEditClick}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <MdEdit size="70%" />
                </Button>
                <Button
                  rounded="md"
                  boxSize="30px"
                  minW="none"
                  p={0}
                  variant="outline"
                  onClick={handleDeleteClick}
                >
                  <MdDelete size="70%" />
                </Button>
              </Flex>
            ) : (
              <Box h="30px" />
            )}
          </>
        )}
      </Flex>
    </ListItem>
  );
};
