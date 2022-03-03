import { DeckList, DeckListProps } from "@/components/model/deck/DeckList";
import { SearchBar } from "@/components/ui/SearchBar";
import { DeckListData } from "@/hooks/useDeckList";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/react";

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
          <Tag m={3} size="lg" fontWeight="bold">
            {selectedTagName ? selectedTagName : "全てのデッキ"}
          </Tag>
          <SearchBar
            w={"60%"}
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
