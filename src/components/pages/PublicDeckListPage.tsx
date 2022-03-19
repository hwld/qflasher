import { DeckList } from "@/components/model/deck/DeckList";
import { usePublicDeckList } from "@/hooks/usePublicDeckList";
import { routes } from "@/routes";
import { Center, Flex, Heading } from "@chakra-ui/react";

export const PublicDeckListPage: React.FC = () => {
  const publicDecks = usePublicDeckList();

  switch (publicDecks.status) {
    case "error": {
      return (
        <Center>
          <Heading>読み込みに失敗しました</Heading>
        </Center>
      );
    }
    case "loading": {
      return null;
    }
    case "success": {
      return (
        <Flex mt={"10"} mx={"auto"} maxW={"1300px"} flexDir="column">
          <DeckList
            decks={publicDecks.data}
            playOnly
            returnRoute={routes.publicDecksPage}
          />
        </Flex>
      );
    }
  }
};
