import {
  Box,
  Button,
  Center,
  CircularProgress,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdAdd } from "react-icons/md";
import { useMyDeckList } from "../../../contexts/MyDeckListContext";
import { DeckListItem } from "../../DeckListItem";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckListPage: React.FC = () => {
  const router = useRouter();
  const { myDeckList, status } = useMyDeckList();

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  return (
    <Box h="100vh">
      <Header />
      <PageTitle mt={5} mb={5}>
        デッキ一覧
      </PageTitle>
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
