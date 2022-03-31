import { DeckPlayer } from "@/components/model/deck/DeckPlayer";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useDeck } from "@/hooks/useDeck";
import { isRoute, Route, routes } from "@/routes";
import { Center, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useMemo } from "react";

type DeckPlayerPageProps = {
  deckId: string;
  userId: string | undefined;
  settings: DeckPlaySettings;
};

export type DeckPlaySettings = {
  initialFront: "question" | "answer";
  isOrderRandom: boolean;
};

export const DeckPlayerPage: React.FC<DeckPlayerPageProps> = ({
  deckId,
  userId,
  settings,
}) => {
  const router = useAppRouter({ currentPage: routes.playDeckPage });
  const queryResult = router.query;
  const useDeckResult = useDeck(userId, deckId);
  const deckPlayerSize =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";

  const returnRoute = useMemo((): Route => {
    const returnTo = queryResult?.data?.redirectTo;
    if (isRoute(returnTo)) {
      return returnTo;
    } else {
      return routes.rootPage;
    }
  }, [queryResult]);

  if (useDeckResult.status === "loading" || queryResult.status === "loading") {
    return <AppLoading isLoading={true} />;
  } else if (useDeckResult.status === "error") {
    if (useDeckResult.error === "not-found") {
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="デッキが存在しません。"
        />
      );
    }
    return (
      <ErrorMessageBox
        mx="auto"
        mt={10}
        header="エラー"
        description="デッキの読み込みに失敗しましfた。"
      />
    );
  } else {
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
            {useDeckResult.data.name}
          </Text>
        </Center>
        <DeckPlayer
          my={5}
          mx="auto"
          w="90%"
          maxW="800px"
          returnRoute={returnRoute}
          size={deckPlayerSize}
          deck={useDeckResult.data}
          settings={settings}
        />
      </Grid>
    );
  }
};
