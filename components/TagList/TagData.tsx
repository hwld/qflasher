import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSetAppState } from "../../context/AppStateContextProvider";
import { UseTagsResult } from "../../hooks/useTags";
import { Tag } from "../../types";
import { EditableTagName } from "./EditableTagName";

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
  const { startLoading, endLoading } = useSetAppState();
  const [editable, setEditable] = useState(false);

  const onCompleteUpdate = async (tagName: string) => {
    if (tagName !== "" && tag.name !== tagName) {
      let id = startLoading();
      await updateTag({ ...tag, name: tagName });
      endLoading(id);
    }
    setEditable(false);
  };

  const onClickEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    setEditable(true);
  };

  const onClickDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    deleteTag(tag.id);
  };

  return (
    <>
      {editable ? (
        <EditableTagName
          defaultTagName={tag.name}
          onComplete={onCompleteUpdate}
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
              onClick={onClickEdit}
            >
              <MdEdit size="70%" />
            </Button>
            <Button
              rounded="md"
              boxSize="30px"
              minW="none"
              p={0}
              variant="outline"
              onClick={onClickDelete}
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
