import { Box, Center, CircularProgress, Grid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useMemo } from "react";
import { MdAdd } from "react-icons/md";
import { useDeckList } from "../../../hooks/useDeckList";
import { useDeckOperation } from "../../../hooks/useDeckOperation";
import { DeckListItem } from "../../DeckListItem";
import { Fab } from "../../Fab";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

type DeckListPageProps = { userId: string };

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck } = useDeckOperation(userId);

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  const deckList = useMemo(() => {
    switch (useDeckListResult.status) {
      case "error": {
        return (
          <Center>
            <Heading>読み込みに失敗しました</Heading>
          </Center>
        );
      }
      case "loading": {
        return (
          <Center>
            <CircularProgress isIndeterminate />
          </Center>
        );
      }
      case "success": {
        return (
          <Grid
            templateColumns="repeat(auto-fill,500px)"
            gap={5}
            justifyContent="center"
          >
            {useDeckListResult.decks.map((deck) => {
              return (
                <DeckListItem
                  key={deck.id}
                  deck={deck}
                  onDeleteDeck={deleteDeck}
                />
              );
            })}
          </Grid>
        );
      }
    }
  }, [deleteDeck, useDeckListResult.decks, useDeckListResult.status]);

  return (
    <Box h="100vh">
      <Header />
      <PageTitle mt={5} mb={5}>
        デッキ一覧
      </PageTitle>
      {deckList}
      <Fab tooltipLabel="追加" onClick={handleAddDeck}>
        <MdAdd size="70%" />
      </Fab>
    </Box>
  );
};
