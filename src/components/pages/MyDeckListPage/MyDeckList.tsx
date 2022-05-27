import { MyDeckItem } from "@/components/model/deck/DeckItem/MyDeckItem";
import { useDeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { NoDeckItem } from "@/components/model/deck/NoDeckItem";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Grid, List } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

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
  const [animating, setAnimating] = useState(false);

  const handleDeleteDeck = useCallback(
    async (id: string) => {
      setAnimating(true);
      onDeleteDeck(id);
    },
    [onDeleteDeck]
  );
  const handleExitComplete = useCallback(() => {
    setAnimating(false);
  }, []);

  const content = useMemo(() => {
    // framer-motionのAnimatePresenceのonExitCompleteが発火されたあとに
    // 再レンダリングが発生することを期待している。
    //
    if (decks.length === 0 && animating === false) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <NoDeckItem />
        </motion.div>
      );
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
            onDeleteDeck={handleDeleteDeck}
            onTagDeck={onTagDeck}
          />
        </motion.div>
      );
    });
  }, [animating, deckCardStyle, decks, handleDeleteDeck, onTagDeck]);

  return (
    <Grid
      as={List}
      templateColumns={`repeat(auto-fill,${deckCardStyle.width}px)`}
      gap={5}
      w="100%"
      justifyContent="flex-start"
    >
      <AnimatePresence onExitComplete={handleExitComplete}>
        {content}
      </AnimatePresence>
    </Grid>
  );
};
