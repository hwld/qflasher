import { PublicDeckList } from "@/components/pages/PublicDeckListPage/PublicDeckList";
import { AppLogo } from "@/components/ui/AppLogo";
import { DeckWithoutCards } from "@/models";
import { Flex, Heading, VStack } from "@chakra-ui/react";

type Props = { decks: DeckWithoutCards[] };

export const PublicDeckListContent: React.VFC<Props> = ({ decks }) => {
  return (
    <VStack
      mt={3}
      mx={"auto"}
      w="90%"
      maxW={"1300px"}
      spacing={10}
      align="flex-start"
      pb={16}
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
        <PublicDeckList decks={decks} />
      </VStack>
    </VStack>
  );
};
