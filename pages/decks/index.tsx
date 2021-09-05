import { Box, Button, Grid, Tooltip } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdAdd } from "react-icons/md";
import { DeckListItem } from "../../components/DeckListItem";
import { Header } from "../../components/Header";
import { PageTitle } from "../../components/PageTitle";
import { useDeckListContext } from "../../contexts/DeckListContext";

const DeckListPage: NextPage = () => {
  const router = useRouter();
  const { deckList } = useDeckListContext();

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  return (
    <Box h="100vh">
      <Header />
      <PageTitle mt={5}>デッキ一覧</PageTitle>
      <Grid
        mt={5}
        templateColumns="repeat(auto-fill,500px)"
        gap={5}
        justifyContent="center"
      >
        {deckList.map((deck) => {
          return <DeckListItem key={deck.id} deck={deck} />;
        })}
      </Grid>
      <Box h="120px">
        <Tooltip label="追加">
          <Button
            zIndex="1"
            position="fixed"
            bgColor="orange.300"
            _hover={{ bgColor: "orange.400" }}
            _active={{ bgColor: "orange.500" }}
            color="gray.700"
            bottom="20px"
            right="20px"
            padding={0}
            boxSize="70px"
            rounded="full"
            boxShadow="dark-lg"
            onClick={handleAddDeck}
          >
            <MdAdd size="70%" />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DeckListPage;
