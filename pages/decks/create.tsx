import { Box, Button, Tooltip } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { DeckForm } from "../../components/DeckForm";
import { Header } from "../../components/Header";
import { PageTitle } from "../../components/PageTitle";
import { useDeckListContext } from "../../contexts/DeckListContext";
import { Deck } from "../../types";

const DeckEditPage: NextPage = () => {
  const router = useRouter();
  const { setDeckList } = useDeckListContext();

  const formId = "createDeckForm";

  const handleSubmit = (deck: Deck) => {
    setDeckList((decks) => [
      ...decks,
      { ...deck, id: Math.random().toString() },
    ]);
    router.push("/decks");
  };

  return (
    <Box minH="100vh">
      <Header />
      <PageTitle mt={5}>デッキ作成</PageTitle>
      <Box mt={5} maxW="800px" marginX="auto">
        <DeckForm formId={formId} onSubmit={handleSubmit} />
      </Box>
      <Tooltip label="作成">
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
  );
};

export default DeckEditPage;
