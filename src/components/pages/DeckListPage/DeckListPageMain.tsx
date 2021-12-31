import { Box, Center, Heading } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/react";
import { DeckListData } from "../../../hooks/useDeckList";
import { DeckList } from "../../model/deck/DeckList/DeckList";
import { SearchBar } from "../../ui/SearchBar/SearchBar";

type Props = {
  deckListData: DeckListData;
  searchText: string;
  selectedTagId: string | undefined;
  selectedTagName: string | undefined;
  onChangeSearchText: (text: string) => void;
  onDeleteDeck: (id: string) => Promise<void>;
};

export const DeckListPageMain: React.FC<Props> = ({
  deckListData,
  searchText,
  selectedTagId,
  selectedTagName,
  onChangeSearchText,
  onDeleteDeck,
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
            selectedTagId={selectedTagId}
            decks={viewDecks}
            onDelete={onDeleteDeck}
          />
        </Box>
      );
    }
  }
};
