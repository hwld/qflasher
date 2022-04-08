import {
  EditableTagName,
  EditableTagNameProps,
} from "@/components/model/tag/TagListItem/EditableTagName";
import {
  TagListItemBase,
  TagListItemLayoutProps,
} from "@/components/model/tag/TagListItem/TagListItemBase";
import { useTagDrag } from "@/components/model/tag/useTagDnD";
import { UseTagsResult } from "@/components/model/tag/useTags";
import { useConfirm } from "@/context/ConfirmContext";
import { Tag } from "@/models";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { MdDelete, MdEdit } from "react-icons/md";

export type TagDataProps = {
  tag: Tag;
  selected: boolean;
  onSelectTag: (id: string) => void;
  onUpdateTag: UseTagsResult["updateTag"];
  onDeleteTag: UseTagsResult["deleteTag"];
} & TagListItemLayoutProps;

export const TagDataItem: React.FC<TagDataProps> = ({
  tag,
  selected,
  onSelectTag,
  onUpdateTag,
  onDeleteTag,
  ...props
}) => {
  const confirm = useConfirm();
  const [editable, setEditable] = useState(false);
  const [_, dragRef, preview] = useTagDrag(
    () => ({
      item: () => tag,
      canDrag: () => !editable,
    }),
    [editable]
  );

  const handleClickItem = () => {
    onSelectTag(tag.id);
  };

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

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TagListItemBase
      ref={dragRef}
      {...props}
      selected={selected}
      onClickItem={handleClickItem}
    >
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
              rounded="sm"
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
              rounded="sm"
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
    </TagListItemBase>
  );
};
