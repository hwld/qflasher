import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { Reducer, useReducer } from "react";
import { RiAddFill } from "react-icons/ri";
import { UseTagsResult } from "../../../../../hooks/useTags";
import { assertNever } from "../../../../../utils/assertNever";
import { TagList } from "../../../../TagList/TagList";

type Props = {} & UseTagsResult;

type State = { isAll: boolean; selectedTagId: string };
type Action = { type: "selectTag"; tagId: string } | { type: "selectAll" };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "selectTag": {
      if (state.selectedTagId === action.tagId) {
        return { isAll: true, selectedTagId: "" };
      }
      return { isAll: false, selectedTagId: action.tagId };
    }
    case "selectAll": {
      if (state.isAll) {
        return state;
      }
      return { isAll: true, selectedTagId: "" };
    }
    default: {
      return assertNever(action);
    }
  }
};

export const TagsSideView: React.FC<Props> = ({
  tags,
  addTag,
  updateTag,
  deleteTag,
}) => {
  const [{ isAll, selectedTagId }, dispatch] = useReducer(reducer, {
    isAll: true,
    selectedTagId: "",
  });

  const handleClickShowAll = () => {
    dispatch({ type: "selectAll" });
  };

  const selectTag = (id: string) => {
    dispatch({ type: "selectTag", tagId: id });
  };

  const handleClickAdd = () => {
    addTag({ name: "新しいタグ" });
  };

  return (
    <Grid h="100%" templateRows="auto auto 1fr">
      <Flex bgColor="gray.500" h="30px" alignItems="center">
        <Box flexGrow={1} />
        <Button
          boxSize="25px"
          bgColor="blackAlpha.400"
          _hover={{ bgColor: "blackAlpha.500" }}
          _active={{ bgColor: "blackAlpha.600" }}
          mr={1}
          minW="none"
          p={0}
          onClick={handleClickAdd}
        >
          <RiAddFill size="100%" />
        </Button>
      </Flex>
      <Box
        bgColor="whiteAlpha.200"
        aria-selected={isAll}
        _selected={{ bgColor: "whiteAlpha.400" }}
        m={3}
        rounded="md"
        onClick={handleClickShowAll}
      >
        <Box
          _hover={{ bgColor: "whiteAlpha.300" }}
          _active={{ bgColor: "whiteAlpha.200" }}
          p={2}
        >
          <Text
            fontWeight="bold"
            textAlign="center"
            color={isAll ? "gray.50" : "gray.300"}
            userSelect="none"
          >
            すべて表示
          </Text>
        </Box>
      </Box>
      <TagList
        tags={tags}
        selectedId={selectedTagId}
        selectTag={selectTag}
        overflow="auto"
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </Grid>
  );
};
