import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage";
import { SettingFormElement } from "@/components/pages/PlaySettingPage/SettingFormElement";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useDeck } from "@/hooks/useDeck";
import { routes } from "@/routes";
import { objectKeys } from "@/utils/ObjectKeys";
import { Box, Button, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  userId: string | undefined;
  deckId: string;
};

export type SettingFormData = { value: boolean; text: string };
export type SettingForm = {
  isAnswerFirst: SettingFormData;
  isOrderRandom: SettingFormData;
};

export const PlaySettingPage: React.FC<Props> = ({ userId, deckId }) => {
  const router = useAppRouter(routes.playSettingPage);
  const queryResult = router.query;
  const useDeckResult = useDeck(userId, deckId);
  const [settings, setSettings] = useState<SettingForm>({
    isAnswerFirst: { value: false, text: "答え → 質問の順で表示する" },
    isOrderRandom: { value: false, text: "順番をランダムにする" },
  });
  const checkBoxSize = useBreakpointValue({ base: "sm", md: "lg" }) ?? "lg";

  const handleChangeSettings = (name: keyof SettingForm, value: boolean) => {
    setSettings((settings): SettingForm => {
      const data: SettingFormData = { value, text: settings[name].text };
      return {
        ...settings,
        [name]: data,
      };
    });
  };

  const handleClick = () => {
    if (queryResult.status === "loading" || queryResult.status === "error") {
      return;
    }
    const redirectTo = queryResult.data.redirectTo;
    const setting: DeckPlaySettings = {
      initialFront: settings.isAnswerFirst.value ? "answer" : "question",
      isOrderRandom: settings.isOrderRandom.value,
    };
    router.push({
      path: routes.playDeckPage,
      query: { id: deckId, redirectTo: redirectTo, ...setting },
    });
  };

  if (queryResult.status === "loading") {
    return null;
  } else if (queryResult.status === "error") {
    return <Redirect href={routes.rootPage} />;
  }

  // TODO 共有できる？
  switch (useDeckResult.status) {
    case "loading": {
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
      const deck = useDeckResult.data;
      return (
        <Stack
          mb={{ base: 3, md: 5 }}
          spacing={5}
          flexDir="column"
          align={"center"}
        >
          <Box bgColor={"gray.600"} w="100%" py={{ base: 14, md: 20 }}>
            <Stack w="93%" maxW="800px" mx="auto">
              <Text
                fontSize={{ base: "xl", md: "4xl" }}
                fontWeight="bold"
                whiteSpace={"nowrap"}
                overflow="hidden"
                textOverflow={"ellipsis"}
              >
                {deck.name}
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>
                枚数: {deck.cardLength}
              </Text>
            </Stack>
          </Box>
          <Stack w="93%" maxW="800px" mx="auto" spacing={5}>
            <Stack spacing={3} h="100%">
              {objectKeys(settings).map((name) => {
                return (
                  <SettingFormElement
                    key={name}
                    name={name}
                    setting={settings[name]}
                    checkBoxSize={checkBoxSize}
                    onChange={handleChangeSettings}
                  />
                );
              })}
            </Stack>
            <Button
              onClick={handleClick}
              colorScheme="green"
              alignSelf={"center"}
            >
              暗記を始める
            </Button>
          </Stack>
        </Stack>
      );
    }
  }
};
