import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useLoadingStateAction } from "../../context/LoadingStateContext";
import { UseTagsResult } from "../../hooks/useTags";
import { Tag } from "../../types";
import { Confirm } from "../Confirm";
import { EditableTagName, EditableTagNameProps } from "./EditableTagName";

type Props = {
  tag: Tag;
  itemClassName: string;
  selected: boolean;
  updateTag: UseTagsResult["updateTag"];
  deleteTag: UseTagsResult["deleteTag"];
};

export const TagData: React.FC<Props> = ({
  tag,
  selected,
  itemClassName,
  updateTag,
  deleteTag,
}) => {
  const { startLoading, endLoading } = useLoadingStateAction();
  const [editable, setEditable] = useState(false);

  const completeUpdate = async (tagName: string) => {
    if (tagName !== "" && tag.name !== tagName) {
      let id = startLoading();
      await updateTag({ ...tag, name: tagName });
      endLoading(id);
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

  const handleApplyDelete = () => {
    deleteTag(tag.id);
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
          <Flex
            flexShrink={0}
            // リストアイテムがホバーされたときだけ表示したい。
            // mouseoverとmouseleaveをつかって状態を管理することもできたが、できるだけ状態をもたせたくなかった。
            display="none"
            sx={{
              [`.${itemClassName}:hover &`]: { display: "flex" },
            }}
          >
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
            <Confirm
              trigger={(onOpen) => {
                return (
                  <Button
                    rounded="md"
                    boxSize="30px"
                    minW="none"
                    p={0}
                    variant="outline"
                    onClick={onOpen}
                  >
                    <MdDelete size="70%" />
                  </Button>
                );
              }}
              onApply={handleApplyDelete}
              title="タグの削除"
              body="タグを削除しますか？"
              applyText="削除する"
              cancelText="キャンセル"
            />
          </Flex>
          <Box h="30px" />
        </>
      )}
    </>
  );
};
