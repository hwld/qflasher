import { DeckPlayer } from "@/components/model/deck/DeckPlayer/DeckPlayer";
import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage/DeckPlayerPage";
import { Deck } from "@/models";
import { Route } from "@/routes";
import { Center, Grid, Text, useBreakpointValue } from "@chakra-ui/react";

type Props = { deck: Deck; returnRoute: Route; settings: DeckPlaySettings };

export const DeckPlayerContent: React.VFC<Props> = ({
  deck,
  returnRoute,
  settings,
}) => {
  const deckPlayerSize =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";

  return (
    <Grid templateRows="auto 1fr" h="100%" w="100%">
      <Center
        bgColor={"gray.700"}
        py={{ base: 1, md: 3 }}
        w="100%"
        overflow={"hidden"}
      >
        <Text
          flexShrink={1}
          fontWeight="bold"
          fontSize={{ base: "lg", md: "2xl" }}
          w={"90%"}
          maxW="1000px"
          textAlign="center"
          whiteSpace={"nowrap"}
          overflow="hidden"
          textOverflow={"ellipsis"}
        >
          {deck.name}
        </Text>
      </Center>
      <DeckPlayer
        my={5}
        mx="auto"
        w="90%"
        maxW="800px"
        returnRoute={returnRoute}
        size={deckPlayerSize}
        deck={deck}
        settings={settings}
      />
    </Grid>
  );
};
