import { useTags } from "@/components/model/tag/useTags";
import { SearchBar } from "@/components/ui/SearchBar";
import { routes } from "@/routes";
import { Button, Flex, Stack, Tag, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMemo } from "react";

type Props = {
  userId: string;
  selectedTagId: string | undefined;
  searchText: string;
  onChangeSearchText: (value: string) => void;
};
export const DeckListHeader: React.VFC<Props> = ({
  userId,
  selectedTagId,
  searchText,
  onChangeSearchText,
}) => {
  const { getTagName } = useTags(userId);
  const selectedTagName = useMemo(() => {
    return getTagName(selectedTagId);
  }, [getTagName, selectedTagId]);

  const tagSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Stack
      w={"90%"}
      maxW={"600px"}
      bgColor={"gray.600"}
      p={5}
      rounded={"md"}
      ml={"25px"}
      spacing={5}
    >
      <Flex justify={"space-between"} flexWrap={"wrap"} gridGap={3}>
        <Tag size={tagSize} fontWeight="bold" alignSelf={"flex-start"}>
          {selectedTagName ? selectedTagName : "全てのデッキ"}
        </Tag>
        <NextLink href={routes.publicDecksPage} passHref>
          <Button
            as={"a"}
            variant={"outline"}
            borderColor="orange.300"
            color={"orange.300"}
            fontSize={{ base: "xs", md: "sm" }}
            border="2px"
          >
            公開されているデッキを見に行く
          </Button>
        </NextLink>
      </Flex>
      <SearchBar text={searchText} onChange={onChangeSearchText} />
    </Stack>
  );
};
