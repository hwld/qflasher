import { Center, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { useMyDeck } from "../../hooks/useMyDeck";
import { DeckPlayer } from "../DeckPlayer";
import { PageTemplate } from "./common/PageTemplate";
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

  if (useMyDeckResult.status === "loading") {
    return <></>;
  }
  if (useMyDeckResult.status === "error") {
    return (
      <Center minH="100vh">
        <Heading>デッキの読み込みに失敗しました</Heading>
      </Center>
    );
  }

  if (!hasCompletedSetting) {
    return <PlaySettingPage onComplete={handleCompleteSetting} />;
  }

  return (
    <PageTemplate title="暗記">
      <Center w="700px" mx="auto">
        <Text fontWeight="bold" fontSize="2xl" textAlign="center">
          {useMyDeckResult.deck.name}
        </Text>
      </Center>
      <DeckPlayer
        mt={5}
        mx="auto"
        deck={useMyDeckResult.deck}
        config={config}
      />
    </PageTemplate>
  );
};
