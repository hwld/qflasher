import { SearchBar } from "@/components/ui/SearchBar";
import { routes } from "@/routes";
import { Button, Flex, Stack, Tag, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  selectedTagName: string | undefined;
  searchText: string;
  onChangeSearchText: (value: string) => void;
};
export const MyDeckListHeader: React.VFC<Props> = ({
  selectedTagName,
  searchText,
  onChangeSearchText,
}) => {
  const tagSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Stack
      w={"90%"}
      minW={"min-content"}
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
