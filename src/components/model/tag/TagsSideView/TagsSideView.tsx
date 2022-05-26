import { TagList } from "@/components/model/tag/TagList";
import { useTagListItems } from "@/components/model/tag/TagListItem/useTagListItems";
import { ShowAllTagsSwitch } from "@/components/model/tag/TagsSideView/ShowAllTagsSwitch";
import { TagsSideViewHeader } from "@/components/model/tag/TagsSideView/TagSideViewHeader";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { useAppOperation } from "@/hooks/useAppOperation";
import { Tag } from "@/models";
import { Divider, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

export type TagsSideViewProps = {
  userId: string;
  selectedTagId: string | undefined;
  onSelectTagId: (id: string | undefined) => void;
  tags: Tag[];
};

export const TagsSideView: React.FC<TagsSideViewProps> = ({
  userId,
  selectedTagId,
  onSelectTagId,
  tags,
}) => {
  const { addTag, updateTag, deleteTag } = useTagOperation(userId);
  const appAddTag = useAppOperation(addTag);
  const appUpdateTag = useAppOperation(updateTag);
  const appDeleteTag = useAppOperation(deleteTag);

  const { tagListItems, addTagCreator, addTagData, deleteTagCreator } =
    useTagListItems(tags, appAddTag);

  const handleClickShowAll = () => {
    onSelectTagId(undefined);
  };

  const handleDeleteTag = async (id: string) => {
    if (id === selectedTagId) {
      onSelectTagId(undefined);
    }
    appDeleteTag(id);
  };

  return (
    <Grid h="100%" templateRows="auto auto auto 1fr">
      <TagsSideViewHeader onClickAddTag={addTagCreator} />

      <ShowAllTagsSwitch
        mt={3}
        mx={3}
        selectedTagId={selectedTagId}
        onClickShowAll={handleClickShowAll}
      />
      <Flex my={2} alignItems={"center"}>
        <Text
          ml={2}
          fontWeight={"bold"}
          overflowWrap={"unset"}
          flexGrow={1}
          flexShrink={0}
          userSelect={"none"}
        >
          タグ一覧
        </Text>
        <Divider ml={2} bgColor={"gray.500"} />
      </Flex>
      <TagList
        overflow="auto"
        tagListItems={tagListItems}
        selectedId={selectedTagId}
        onAddTagData={addTagData}
        onAddTagCreator={addTagCreator}
        onDeleteTagCreator={deleteTagCreator}
        onDeleteTag={handleDeleteTag}
        onSelectTag={onSelectTagId}
        onUpdateTag={appUpdateTag}
      />
    </Grid>
  );
};
