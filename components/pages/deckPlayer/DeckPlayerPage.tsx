import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetAppState } from "../../../context/AppStateContextProvider";
import { useMyDeck } from "../../../hooks/useMyDeck";
import { DeckPlayer } from "../../DeckPlayer";
import { PageTitle } from "../../PageTitle";
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
  const [completedSetting, setCompletedSetting] = useState(false);
  const [config, setConfig] = useState<DeckPlayConfig>({
    initialFront: "question",
    isOrderRandom: false,
  });
  const useMyDeckResult = useMyDeck(userId, deckId);
  const { setIsLoading } = useSetAppState();

  useEffect(() => {
    if (useMyDeckResult.status !== "loading") {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [setIsLoading, useMyDeckResult.status]);

  const handleCompleteSetting = (config: DeckPlayConfig) => {
    setCompletedSetting(true);
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

  if (!completedSetting) {
    return <PlaySettingPage onComplete={handleCompleteSetting} />;
  }

  return (
    <Box>
      <PageTitle mt={5}>暗記</PageTitle>
      <Center w="700px" mt={5} mx="auto">
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
    </Box>
  );
};
