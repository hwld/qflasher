import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { AiFillTags, AiOutlineSearch } from "react-icons/ai";
import { SideArea } from "./SideArea";
import { SideMenuItem } from "./SideMenuItem";
import { TagsSideView } from "./TagsSideView/TagsSideView";

export type SideMenuChoices = "tags" | "search" | "none";

type Props = {
  selected: SideMenuChoices;
  onSelect: (selected: SideMenuChoices) => void;
};

export const SideMenu: React.FC<Props> = ({ selected, onSelect }) => {
  const handleClickTags = () => {
    if (selected === "tags") {
      onSelect("none");
    } else {
      onSelect("tags");
    }
  };
  const handleClickSearch = () => {
    if (selected === "search") {
      onSelect("none");
    } else {
      onSelect("search");
    }
  };

  return (
    <Flex>
      <Box w="60px" h="100%" bgColor="gray.600" boxShadow="xl">
        <SideMenuItem
          selected={selected === "tags"}
          icon={AiFillTags}
          onClick={handleClickTags}
        />
        <SideMenuItem
          selected={selected === "search"}
          icon={AiOutlineSearch}
          onClick={handleClickSearch}
        />
      </Box>
      {selected !== "none" && (
        <SideArea>{selected === "tags" && <TagsSideView />}</SideArea>
      )}
    </Flex>
  );
};
