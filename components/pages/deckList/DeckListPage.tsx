import { Box, Center, CircularProgress, Grid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdAdd } from "react-icons/md";
import { useMyDeckListData } from "../../../contexts/MyDeckListContext";
import { DeckListItem } from "../../DeckListItem";
import { Fab } from "../../Fab";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckListPage: React.FC = () => {
  const router = useRouter();
  const { myDeckList, status } = useMyDeckListData();

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  return (
    <Box h="100vh">
      <Header />
      <PageTitle mt={5} mb={5}>
        デッキ一覧
      </PageTitle>
      {status === "error" && (
        <Center>
          <Heading>読み込みに失敗しました</Heading>
        </Center>
      )}
      {status === "loading" ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill,500px)"
          gap={5}
          justifyContent="center"
        >
          {myDeckList.map((deck) => {
            return <DeckListItem key={deck.id} deck={deck} />;
          })}
        </Grid>
      )}
      <Fab tooltipLabel="追加" onClick={handleAddDeck}>
        <MdAdd size="70%" />
      </Fab>
    </Box>
  );
};
