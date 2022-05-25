import { MyDeckItem } from "@/components/model/deck/DeckItem/MyDeckItem";
import { useDeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { NoDeckItem } from "@/components/model/deck/NoDeckItem";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Grid, List } from "@chakra-ui/react";
import { useMemo } from "react";

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

  const content = useMemo(() => {
    if (decks.length === 0) {
      return <NoDeckItem />;
    }

    return decks.map((deck) => {
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
    });
  }, [deckCardStyle, decks, onDeleteDeck, onTagDeck]);

  return (
    <Grid
      as={List}
      templateColumns={`repeat(auto-fill,${deckCardStyle.width}px)`}
      gap={5}
      w="100%"
      justifyContent="flex-start"
    >
      {content}
    </Grid>
  );
};
