import { MyDeckListItem } from "@/components/model/deck/DeckListItem/MyDeckListItem";
import { useDeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Grid, List } from "@chakra-ui/react";

type MyDeckListProps = {
  decks: DeckWithoutCards[];
  onDeleteDeck: (id: string) => Promise<void>;
  onTagDeck: (deckId: string, tagId: string) => void;
};

export const MyDeckList: React.VFC<MyDeckListProps> = ({
  decks,
  onDeleteDeck,
  onTagDeck,
}) => {
  const deckCardStyle = useDeckCardStyle();

  return (
    <Grid
      as={List}
      templateColumns={`repeat(auto-fill,${deckCardStyle.width}px)`}
      gap={5}
      w="100%"
      justifyContent="flex-start"
    >
      {decks.map((deck) => {
        return (
          <MyDeckListItem
            cardStyle={deckCardStyle}
            key={deck.id}
            deck={deck}
            returnRoutes={routes.myDecksPage}
            onDeleteDeck={onDeleteDeck}
            onTagDeck={onTagDeck}
          />
        );
      })}
    </Grid>
  );
};
