import { DeckList } from "@/components/model/deck/DeckList";
import { DeckListItemProps } from "@/components/model/deck/DeckListItem/DeckListItem";
import { AppLoading } from "@/components/ui/AppLoading";
import { SearchBar } from "@/components/ui/SearchBar";
import { DeckListData } from "@/components/model/deck/useMyDeckList";
import { routes } from "@/routes";
import { Center, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button, Tag, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  deckListData: DeckListData;
  searchText: string;
  selectedTagId: string | undefined;
  selectedTagName: string | undefined;
  onChangeSearchText: (text: string) => void;
  onDeleteDeck: DeckListItemProps["onDeleteDeck"];
  onTagDeck: DeckListItemProps["onTagDeck"];
};

export const DeckListPageMain: React.FC<Props> = ({
  deckListData,
  searchText,
  selectedTagId,
  selectedTagName,
  onChangeSearchText,
  onDeleteDeck,
  onTagDeck,
}) => {
  const tagSize = useBreakpointValue({ base: "md", md: "lg" });

  switch (deckListData.status) {
    case "error": {
      return (
        <Center>
          <Heading>読み込みに失敗しました</Heading>
        </Center>
      );
    }
    case "loading": {
      return <AppLoading isLoading={true} />;
    }
    case "success": {
      const viewDecks = deckListData.data.filter((decks) =>
        decks.name.includes(searchText)
      );
      return (
        <Stack mt={5} spacing={5}>
          <Stack
            w={"90%"}
            maxW={"600px"}
            bgColor={"gray.600"}
            p={5}
            rounded={"md"}
            mx={"auto"}
          >
            <Stack spacing={5}>
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
                  >
                    公開されているデッキを見に行く
                  </Button>
                </NextLink>
              </Flex>
              <SearchBar text={searchText} onChange={onChangeSearchText} />
            </Stack>
          </Stack>
          <DeckList
            selectedTagId={selectedTagId}
            decks={viewDecks}
            returnRoute={routes.myDecksPage}
            onDeleteDeck={onDeleteDeck}
            onTagDeck={onTagDeck}
          />
        </Stack>
      );
    }
  }
};
