import { DeckList, DeckListProps } from "@/components/model/deck/DeckList";
import { SearchBar } from "@/components/ui/SearchBar";
import { DeckListData } from "@/hooks/useDeckList";
import { Center, Heading, Stack } from "@chakra-ui/layout";
import { Tag, useBreakpointValue } from "@chakra-ui/react";

type Props = {
  deckListData: DeckListData;
  searchText: string;
  selectedTagId: string | undefined;
  selectedTagName: string | undefined;
  onChangeSearchText: (text: string) => void;
  onDeleteDeck: DeckListProps["onDeleteDeck"];
  onTagDeck: DeckListProps["onTagDeck"];
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
      return null;
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
              <Tag size={tagSize} fontWeight="bold" alignSelf={"flex-start"}>
                {selectedTagName ? selectedTagName : "全てのデッキ"}
              </Tag>
              <SearchBar text={searchText} onChange={onChangeSearchText} />
            </Stack>
          </Stack>
          <DeckList
            selectedTagId={selectedTagId}
            decks={viewDecks}
            onDeleteDeck={onDeleteDeck}
            onTagDeck={onTagDeck}
          />
        </Stack>
      );
    }
  }
};
