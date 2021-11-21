import Icon from "@chakra-ui/icon";
import {
  Flex,
  ListItem,
  ListProps,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import React from "react";
import { AiFillTag } from "react-icons/ai";
import { Tag } from "../TagsSideView";

type Props = {
  tags: Tag[];
  selectedId: string;
  selectTag: (tagId: string) => void;
} & ListProps;

export const TagList: React.FC<Props> = ({
  tags,
  selectedId,
  selectTag,
  ...styles
}) => {
  return (
    <UnorderedList listStyleType="none" m={0} p={0} {...styles}>
      {tags.map((tag) => {
        const handleClickTag = () => {
          selectTag(tag.id);
        };

        return (
          <ListItem
            rounded="md"
            key={tag.id}
            m={1}
            aria-selected={selectedId === tag.id}
            _selected={{ bgColor: "whiteAlpha.400" }}
          >
            <Flex
              rounded="md"
              p={2}
              align="center"
              _hover={{ bgColor: "whiteAlpha.300" }}
              _active={{ bgColor: "whiteAlpha.200" }}
              onClick={handleClickTag}
            >
              <Icon as={AiFillTag} mr={2} />
              <Text
                userSelect="none"
                color={selectedId === tag.id ? "gray.50" : "gray.300"}
                fontWeight="bold"
              >
                {tag.name}
              </Text>
            </Flex>
          </ListItem>
        );
      })}
    </UnorderedList>
  );
};
