import { DeckList } from "@/components/model/deck/DeckList";
import { usePublicDeckList } from "@/components/model/deck/usePublicDeckList";
import { AppLoading } from "@/components/ui/AppLoading";
import { AppLogo } from "@/components/ui/AppLogo";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { routes } from "@/routes";
import { Flex, Heading, VStack } from "@chakra-ui/react";

export const PublicDeckListPage: React.FC = () => {
  const publicDecks = usePublicDeckList();

  switch (publicDecks.status) {
    case "loading": {
      return <AppLoading />;
    }
    case "error": {
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="公開デッキの読み込みに失敗しました。"
        />
      );
    }
    case "ok": {
      return (
        <VStack
          mt={3}
          mx={"auto"}
          w="90%"
          maxW={"1300px"}
          spacing={10}
          align="flex-start"
        >
          <Flex
            w={"100%"}
            bgGradient={"linear(to-br, green.400 75%, orange.300 75%)"}
            flexGrow={1}
            justify="center"
            align={"center"}
            py={{ base: "16", md: "20" }}
            rounded="md"
          >
            <AppLogo width={{ base: "70%", md: "50%" }} />
          </Flex>

          <VStack spacing={5} align={"flex-start"} w="100%">
            <Heading>新着</Heading>
            <DeckList
              decks={publicDecks.data}
              playOnly
              returnRoute={routes.publicDecksPage}
              styleProps={{ justifyContent: "flex-start" }}
            />
          </VStack>
        </VStack>
      );
    }
  }
};
