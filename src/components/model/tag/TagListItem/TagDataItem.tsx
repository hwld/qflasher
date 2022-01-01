import {
  EditableTagName,
  EditableTagNameProps,
} from "@/components/model/tag/TagListItem";
import { useConfirm } from "@/context/ConfirmContext";
import { UseTagsResult } from "@/hooks/useTags";
import { Tag } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export type TagDataProps = {
  tag: Tag;
  selected: boolean;
  onUpdateTag: UseTagsResult["updateTag"];
  onDeleteTag: UseTagsResult["deleteTag"];
};

export const TagDataItem: React.FC<TagDataProps> = ({
  tag,
  selected,
  onUpdateTag,
  onDeleteTag,
}) => {
  const [editable, setEditable] = useState(false);
  const confirm = useConfirm();

  const completeUpdate = async (tagName: string) => {
    if (tagName !== "" && tag.name !== tagName) {
      await onUpdateTag({ ...tag, name: tagName });
    }
    setEditable(false);
  };

  const handleKeyDownEditableTagName: EditableTagNameProps["onKeyDown"] = (
    { key },
    tagName
  ) => {
    if (key === "Enter") {
      completeUpdate(tagName);
    }
  };

  const handleBlurEditableTagName = (tagName: string) => {
    completeUpdate(tagName);
  };

  const handleClickEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    setEditable(true);
  };

  const handleDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    confirm({
      onContinue: () => onDeleteTag(tag.id),
      title: "タグの削除",
      body: "タグを削除しますか？",
      continueText: "削除する",
      cancelText: "キャンセル",
    });
  };

  return (
    <>
      {editable ? (
        <EditableTagName
          defaultTagName={tag.name}
          onKeyDown={handleKeyDownEditableTagName}
          onBlur={handleBlurEditableTagName}
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
          <Flex flexShrink={0} display="none" _groupHover={{ display: "flex" }}>
            <Button
              rounded="md"
              boxSize="30px"
              minW="none"
              mr={1}
              p={0}
              variant="outline"
              onClick={handleClickEdit}
            >
              <MdEdit size="70%" />
            </Button>
            <Button
              rounded="md"
              boxSize="30px"
              minW="none"
              p={0}
              variant="outline"
              onClick={handleDelete}
            >
              <MdDelete size="70%" />
            </Button>
          </Flex>
          <Box h="30px" />
        </>
      )}
    </>
  );
};
