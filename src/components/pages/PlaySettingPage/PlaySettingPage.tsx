import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage";
import { SettingFormElement } from "@/components/pages/PlaySettingPage/SettingFormElement";
import { objectKeys } from "@/utils/ObjectKeys";
import { Button, Stack, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  onComplete: (settings: DeckPlaySettings) => void;
};

export type SettingFormData = { value: boolean; text: string };
export type SettingForm = {
  isAnswerFirst: SettingFormData;
  isOrderRandom: SettingFormData;
};

export const PlaySettingPage: React.FC<Props> = ({ onComplete }) => {
  const checkBoxSize = useBreakpointValue({ base: "sm", md: "lg" }) ?? "lg";
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

  const handleClick = () => {
    onComplete({
      initialFront: settings.isAnswerFirst.value ? "answer" : "question",
      isOrderRandom: settings.isOrderRandom.value,
    });
  };

  return (
    <Stack
      my={{ base: 3, md: 5 }}
      spacing={5}
      flexDir="column"
      w="95%"
      maxW="800px"
      mx="auto"
    >
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
        mt={5}
        onClick={handleClick}
        colorScheme="green"
        alignSelf={"center"}
      >
        暗記を始める
      </Button>
    </Stack>
  );
};
