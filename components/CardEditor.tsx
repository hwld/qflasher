import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { FlashCard } from "../types";

type Props = {
  card: FlashCard;
  onChangeQuestion: (id: string, value: string) => void;
  onChangeAnswer: (id: string, value: string) => void;
  onDelete: (id: string) => void;
};

const Component: React.FC<Props> = ({
  card,
  onChangeQuestion,
  onChangeAnswer,
  onDelete,
}) => {
  const handleChangeQuestion: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeQuestion(card.id, value);
  };

  const handleChangeAnswer: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeAnswer(card.id, value);
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  return (
    <Box key={card.id} padding={10} bgColor="gray.600">
      <Text>質問:</Text>
      <Input value={card.question} onChange={handleChangeQuestion} />
      <Text>答え:</Text>
      <Input value={card.answer} onChange={handleChangeAnswer} />
      <Button mt={3} colorScheme="red" onClick={handleDelete}>
        削除
      </Button>
    </Box>
  );
};

export const CardEditor = Component;
