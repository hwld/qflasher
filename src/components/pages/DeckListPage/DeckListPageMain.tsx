import { DeckList, DeckListProps } from "@/components/model/deck/DeckList";
import { SearchBar } from "@/components/ui/SearchBar";
import { DeckListData } from "@/hooks/useDeckList";
import { Box, Center, Heading } from "@chakra-ui/layout";
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
      const viewDecks = deckListData.decks.filter((decks) =>
        decks.name.includes(searchText)
      );
      return (
        <Box>
          <Tag m={{ base: 2, md: 3 }} size={tagSize} fontWeight="bold">
            {selectedTagName ? selectedTagName : "全てのデッキ"}
          </Tag>
          <SearchBar
            w={"90%"}
            maxW={"600px"}
            mx={"auto"}
            text={searchText}
            onChange={onChangeSearchText}
          />
          <DeckList
            mt={4}
            mx="auto"
            maxW="1500px"
            selectedTagId={selectedTagId}
            decks={viewDecks}
            onDeleteDeck={onDeleteDeck}
            onTagDeck={onTagDeck}
          />
        </Box>
      );
    }
  }
};
