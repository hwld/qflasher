import { Box, Button, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdAdd } from "react-icons/md";
import { DeckListItem } from "../components/DeckListItem";
import { Header } from "../components/Header";
import { useDeckListContext } from "../contexts/DeckListContext";

const DeckListPage: NextPage = () => {
  const router = useRouter();
  const { deckList } = useDeckListContext();
  console.log(deckList.length);

  const handleAddDeck = () => {
    router.push("/deckEdit");
  };

  return (
    <Box h="100vh">
      <Header />
      <Grid
        mt={3}
        templateColumns="repeat(auto-fill,500px)"
        gap={5}
        justifyContent="center"
      >
        {deckList.map((deck) => {
          return <DeckListItem key={deck.id} deck={deck} />;
        })}
      </Grid>
      <Box h="120px">
        <Button
          zIndex="1"
          position="fixed"
          colorScheme="orange"
          color="gray.700"
          bottom="20px"
          right="20px"
          ml={5}
          padding={0}
          boxSize="70px"
          rounded="full"
          boxShadow="dark-lg"
          onClick={handleAddDeck}
        >
          <MdAdd size="70%" />
        </Button>
      </Box>
    </Box>
  );
};

export default DeckListPage;
