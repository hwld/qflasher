import { Box, Button, Center, Tooltip } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckForm } from "../../components/DeckForm";
import { Header } from "../../components/Header";
import { PageTitle } from "../../components/PageTitle";
import { useDeckList } from "../../contexts/DeckListContext";
import { Deck } from "../../types";

const DeckEditPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { deckList, updateDeck } = useDeckList();
  const deck = deckList.find((deck) => deck.id === id);

  const formId = "updateDeckForm";

  if (!deck) {
    return <Center>存在しません</Center>;
  }

  const handleUpdateDeck = (deck: Deck) => {
    updateDeck(deck);
    router.push("/decks");
  };

  return (
    <AuthRequiredPage>
      <Box minH="100vh">
        <Header />
        <PageTitle mt={5}>デッキ更新</PageTitle>
        <Box mt={5} maxW="800px" marginX="auto">
          <DeckForm
            defaultDeck={deck}
            formId={formId}
            onSubmit={handleUpdateDeck}
          />
          <Tooltip label="更新">
            <Button
              type="submit"
              form={formId}
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
            >
              <MdSave size="60%" />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </AuthRequiredPage>
  );
};

export default DeckEditPage;
