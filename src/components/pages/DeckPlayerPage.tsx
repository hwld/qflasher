import { DeckPlayer } from "@/components/model/deck/DeckPlayer";
import { PlaySettingPage } from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useDeck } from "@/hooks/useDeck";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { Center, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";

type DeckPlayerPageProps = { deckId: string; userId: string | undefined };

export type DeckPlaySettings = {
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
  const [settings, setSettings] = useState<DeckPlaySettings>({
    initialFront: "question",
    isOrderRandom: false,
  });

  const useDeckResult = useDeck(userId, deckId);

  useLoadingEffect(useDeckResult.status === "loading");

  const handleCompleteSetting = (settings: DeckPlaySettings) => {
    setHasCompletedSetting(true);
    setSettings(settings);
  };

  switch (useDeckResult.status) {
    case "loading": {
      // useLoadingEffectによってローディング状態が表示されている
      return null;
    }
    case "error": {
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
    }
    case "success": {
      if (!hasCompletedSetting) {
        return <PlaySettingPage onComplete={handleCompleteSetting} />;
      }
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
            size={deckPlayerSize}
            deck={useDeckResult.data}
            settings={settings}
          />
        </Grid>
      );
    }
  }
};
