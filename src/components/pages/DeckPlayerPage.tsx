import { Center, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { useMyDeck } from "../../hooks/useMyDeck";
import { DeckPlayer } from "../DeckPlayer";
import { DeckLoadingErrorPage } from "./DeckLoadingErrorPage";
import { NotFoundDeckPage } from "./NotFoundDeckPage";
import { PlaySettingPage } from "./PlaySettingPage";

type DeckPlayerPageProps = { deckId: string; userId: string };

export type DeckPlayConfig = {
  initialFront: "question" | "answer";
  isOrderRandom: boolean;
};

export const DeckPlayerPage: React.FC<DeckPlayerPageProps> = ({
  deckId,
  userId,
}) => {
  const deckPlayerSize =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  const [hasCompletedSetting, setHasCompletedSetting] = useState(false);
  const [config, setConfig] = useState<DeckPlayConfig>({
    initialFront: "question",
    isOrderRandom: false,
  });
  const useMyDeckResult = useMyDeck(userId, deckId);

  useLoadingEffect(useMyDeckResult.status === "loading");

  const handleCompleteSetting = (config: DeckPlayConfig) => {
    setHasCompletedSetting(true);
    setConfig(config);
  };

  switch (useMyDeckResult.status) {
    case "loading": {
      // useLoadingEffectによってローディング状態が表示されている
      return null;
    }
    case "error": {
      if (useMyDeckResult.error === "not-found") {
        return <NotFoundDeckPage />;
      }
      return <DeckLoadingErrorPage />;
    }
    case "success": {
      if (!hasCompletedSetting) {
        return <PlaySettingPage onComplete={handleCompleteSetting} />;
      }
      return (
        <Grid templateRows="auto 1fr" h="100%">
          <Center mt={5} maxW="700px" mx="auto">
            <Text
              fontWeight="bold"
              fontSize={{ base: "lg", md: "2xl" }}
              textAlign="center"
            >
              {useMyDeckResult.deck.name}
            </Text>
          </Center>
          <DeckPlayer
            mt={5}
            mx="auto"
            w="90%"
            size={deckPlayerSize}
            deck={useMyDeckResult.deck}
            config={config}
          />
        </Grid>
      );
    }
  }
};
