import { Box, Button, Checkbox, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { PageTitle } from "./common/PageTitle";
import { DeckPlayConfig } from "./DeckPlayerPage";

type Props = {
  onComplete: (config: DeckPlayConfig) => void;
};

export const PlaySettingPage: React.FC<Props> = ({ onComplete }) => {
  const [isAnswerFirst, setIsAnswerFirst] = useState(false);
  const [isOrderRandom, setIsOrderRandom] = useState(false);

  const handleClick = () => {
    onComplete({
      initialFront: isAnswerFirst ? "answer" : "question",
      isOrderRandom,
    });
  };

  return (
    <Box>
      <Flex flexDir="column" maxW="800px" m="auto" alignItems="center">
        <PageTitle mt={5}>暗記設定</PageTitle>
        <Box mt={5} p={5} bgColor="gray.700" w="100%">
          <Checkbox
            size="lg"
            colorScheme="green"
            isChecked={isAnswerFirst}
            onChange={({ target: { checked } }) => setIsAnswerFirst(checked)}
          >
            答え → 質問の順で表示する
          </Checkbox>
        </Box>
        <Box mt={3} p={5} bgColor="gray.700" w="100%">
          <Checkbox
            size="lg"
            colorScheme="green"
            isChecked={isOrderRandom}
            onChange={({ target: { checked } }) => setIsOrderRandom(checked)}
          >
            順番をランダムにする
          </Checkbox>
        </Box>
        <Button mt={5} onClick={handleClick} colorScheme="green">
          暗記を始める
        </Button>
      </Flex>
    </Box>
  );
};
