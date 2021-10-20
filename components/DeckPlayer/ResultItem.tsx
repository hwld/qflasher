import { Box, Center, Text } from "@chakra-ui/layout";
import React from "react";

type Props = { totalCardsCount: number; rightAnswersCount: number };

export const ResultItem: React.FC<Props> = ({
  totalCardsCount,
  rightAnswersCount,
}) => {
  return (
    <Center boxSize="100%">
      <Box>
        <Text
          fontSize="6xl"
          textAlign="center"
        >{`${rightAnswersCount} / ${totalCardsCount}`}</Text>
        <Text fontSize="3xl" textAlign="center">
          正解数
        </Text>
      </Box>
    </Center>
  );
};
