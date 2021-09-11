import { Box, Button, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useDeckList } from "../../../contexts/DeckListContext";
import { Deck } from "../../../types";
import { DeckForm } from "../../DeckForm";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckCreatorPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { addDeck } = useDeckList();

  const formId = "createDeckForm";

  const handleSubmit = async (deck: Deck) => {
    try {
      await addDeck({ ...deck, id: Math.random().toString() });
      router.push("/decks");
    } catch (e) {
      toast({
        title: "エラー",
        description: "エラーが発生しました",
        status: "error",
      });
    }
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
