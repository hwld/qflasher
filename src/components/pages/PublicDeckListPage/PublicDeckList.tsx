import { PublicDeckItem } from "@/components/model/deck/DeckItem/PublicDeckItem/PublicDeckItem";
import { useDeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Grid, List } from "@chakra-ui/react";

type PublicDeckListProps = {
  decks: DeckWithoutCards[];
  userId: string | undefined;
};

export const PublicDeckList: React.VFC<PublicDeckListProps> = ({
  decks,
  userId,
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
          <PublicDeckItem
            key={deck.id}
            deck={deck}
            cardStyle={deckCardStyle}
            returnRoutes={routes.publicDecksPage}
            userId={userId}
          />
        );
      })}
    </Grid>
  );
};
