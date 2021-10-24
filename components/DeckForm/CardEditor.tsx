import {
  Box,
  BoxProps,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import { Control, Controller, FormState } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { DeckFormFields } from ".";
import { FlashCard } from "../../types";

export type CardEditorHandler = {
  focusQuestion: () => void;
  focusAnswer: () => void;
};

type Props = {
  index: number;
  id: string;
  formControl: Control<DeckFormFields, object>;
  cardErrors: FormState<DeckFormFields>["errors"]["cards"];
  defaultValue?: FlashCard;
  onFocusQuestion: (id: string) => void;
  onKeyDownInQuestion: (id: string, event: KeyboardEvent<Element>) => void;
  onKeyDownInAnswer: (id: string, event: KeyboardEvent<Element>) => void;
  onDelete: (id: string) => void;
} & Omit<BoxProps, "defaultValue">;

export const CardEditor: React.FC<Props> = ({
  index,
  id,
  formControl,
  cardErrors,
  defaultValue = { id: "", question: "", answer: "" },
  onFocusQuestion,
  onKeyDownInQuestion,
  onKeyDownInAnswer,
  onDelete,
  ...styles
}) => {
  const questionError = cardErrors?.[index]?.question;
  const answerError = cardErrors?.[index]?.answer;

  const handleKeyDownQuestion: KeyboardEventHandler = (e) => {
    onKeyDownInQuestion(id, e);
  };

  const handleKeyDownAnswer: KeyboardEventHandler = (e) => {
    onKeyDownInAnswer(id, e);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  useEffect(() => {
    onFocusQuestion(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box key={id} padding={5} pt={3} bgColor="gray.700" {...styles}>
      <Stack>
        <Flex justify="space-between">
          <Text fontWeight="bold" mr={2}>
            {index + 1}.
          </Text>
          <Tooltip label="削除">
            <Button
              ml={5}
              boxSize="40px"
              rounded="full"
              minW="unset"
              variant="solid"
              onClick={handleDelete}
              p={0}
            >
              <MdDelete size="60%" />
            </Button>
          </Tooltip>
        </Flex>
        <Box>
          <Controller
            control={formControl}
            name={`cards.${index}.question`}
            defaultValue={defaultValue.question}
            rules={{
              required: { value: true, message: "文字を入力してください" },
              maxLength: {
                value: 100,
                message: "100文字以下で入力してください。",
              },
            }}
            shouldUnregister={true}
            render={({ field }) => (
              <Input
                autoComplete="off"
                spellCheck={false}
                placeholder="質問"
                _placeholder={{ color: "gray.300" }}
                isInvalid={!!questionError}
                onKeyDown={handleKeyDownQuestion}
                {...field}
              />
            )}
          />
          {questionError?.message && (
            <Text ml={3} my={2} color="red">
              ※{questionError?.message}
            </Text>
          )}
        </Box>

        <Box>
          <Controller
            control={formControl}
            name={`cards.${index}.answer`}
            defaultValue={defaultValue.answer}
            shouldUnregister={true}
            rules={{
              required: { value: true, message: "文字を入力してください" },
              maxLength: {
                value: 100,
                message: "100文字以下で入力してください",
              },
            }}
            render={({ field }) => (
              <Input
                autoComplete="off"
                spellCheck={false}
                placeholder="答え"
                _placeholder={{ color: "gray.300" }}
                isInvalid={!!answerError}
                onKeyDown={handleKeyDownAnswer}
                {...field}
              />
            )}
          />
          {answerError?.message && (
            <Text ml={3} my={2} color="red">
              ※{answerError?.message}
            </Text>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
