import { PublicDeckItem } from "@/components/model/deck/DeckItem/PublicDeckItem/PublicDeckItem";
import { useDeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { NoDeckItem } from "@/components/model/deck/NoDeckItem";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Grid, List } from "@chakra-ui/react";
import { useMemo } from "react";

type PublicDeckListProps = {
  decks: DeckWithoutCards[];
  userId: string | undefined;
};

export const PublicDeckList: React.VFC<PublicDeckListProps> = ({
  decks,
  userId,
}) => {
  const deckCardStyle = useDeckItemStyle();

  const content = useMemo(() => {
    if (decks.length === 0) {
      return <NoDeckItem />;
    }

    return decks.map((deck) => {
      return (
        <PublicDeckItem
          key={deck.id}
          deck={deck}
          cardStyle={deckCardStyle}
          returnRoutes={routes.publicDecksPage}
          userId={userId}
        />
      );
    });
  }, [deckCardStyle, decks, userId]);

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
