import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage";
import { PlaySettingHeader } from "@/components/pages/PlaySettingPage/PlaySettingHeader";
import {
  SettingForm,
  SettingFormData,
} from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { SettingFormElement } from "@/components/pages/PlaySettingPage/SettingFormElement";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Query, routes } from "@/routes";
import { objectKeys } from "@/utils/ObjectKeys";
import { Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  deck: DeckWithoutCards;
  queryData: Query[typeof routes.playSettingPage];
};

export const PlaySettingContent: React.VFC<Props> = ({ deck, queryData }) => {
  const router = useAppRouter({ currentPage: routes.playSettingPage });
  const [settings, setSettings] = useState<SettingForm>({
    isAnswerFirst: { value: false, text: "答え → 質問の順で表示する" },
    isOrderRandom: { value: false, text: "順番をランダムにする" },
  });

  const handleChangeSettings = (name: keyof SettingForm, value: boolean) => {
    setSettings((settings): SettingForm => {
      const data: SettingFormData = { value, text: settings[name].text };
      return {
        ...settings,
        [name]: data,
      };
    });
  };

  const handlePlayDeck = () => {
    const setting: DeckPlaySettings = {
      initialFront: settings.isAnswerFirst.value ? "answer" : "question",
      isOrderRandom: settings.isOrderRandom.value,
    };
    router.push({
      path: routes.playDeckPage,
      query: { id: deck.id, redirectTo: queryData.redirectTo, ...setting },
    });
  };

  return (
    <Stack
      mb={{ base: 3, md: 5 }}
      spacing={5}
      flexDir="column"
      align={"center"}
    >
      <PlaySettingHeader deck={deck} />
      <Stack w="93%" maxW="800px" mx="auto" spacing={5}>
        <Stack spacing={3} h="100%">
          {objectKeys(settings).map((name) => {
            return (
              <SettingFormElement
                key={name}
                name={name}
                setting={settings[name]}
                onChange={handleChangeSettings}
              />
            );
          })}
        </Stack>
        <Button
          onClick={handlePlayDeck}
          colorScheme="green"
          alignSelf={"center"}
          aria-label="play deck"
        >
          暗記を始める
        </Button>
      </Stack>
    </Stack>
  );
};
