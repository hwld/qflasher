import { MyDeckItem } from "@/components/model/deck/DeckItem/MyDeckItem";
import { useDeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
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
  const deckCardStyle = useDeckItemStyle();

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
          <MyDeckItem
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
