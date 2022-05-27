import { MyDeckItem } from "@/components/model/deck/DeckItem/MyDeckItem";
import { useDeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { NoDeckItem } from "@/components/model/deck/NoDeckItem";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Grid, List } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
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
        <motion.div
          layout
          key={deck.id}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MyDeckItem
            cardStyle={deckCardStyle}
            deck={deck}
            returnRoutes={routes.myDecksPage}
            onDeleteDeck={onDeleteDeck}
            onTagDeck={onTagDeck}
          />
        </motion.div>
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
      <AnimatePresence>{content}</AnimatePresence>
    </Grid>
  );
};
