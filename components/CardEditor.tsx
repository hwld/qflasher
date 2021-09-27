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
import { Control, Controller } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { FlashCard } from "../types";
import { DeckFormFields } from "./DeckForm";

export type CardEditorHandler = {
  focusQuestion: () => void;
  focusAnswer: () => void;
};

type Props = {
  index: number;
  id: string;
  formControl: Control<DeckFormFields, object>;
  defaultValue?: FlashCard;
  onFocusQuestion: (id: string) => void;
  onKeyDownInQuestion: (id: string, event: KeyboardEvent<Element>) => void;
  onKeyDownInAnswer: (id: string, event: KeyboardEvent<Element>) => void;
  onDelete: (id: string) => void;
} & Omit<BoxProps, "defaultValue">;

const Component: React.FC<Props> = ({
  index,
  id,
  formControl,
  defaultValue = { id: "", question: "", answer: "" },
  onFocusQuestion,
  onKeyDownInQuestion,
  onKeyDownInAnswer,
  onDelete,
  ...styleProps
}) => {
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
    <Box key={id} padding={5} pt={3} bgColor="gray.700" {...styleProps}>
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
        <Controller
          control={formControl}
          name={`cards.${index}.question`}
          defaultValue={defaultValue.question}
          shouldUnregister={true}
          render={({ field }) => (
            <Input
              placeholder="質問"
              _placeholder={{ color: "gray.300" }}
              onKeyDown={handleKeyDownQuestion}
              {...field}
            />
          )}
        />

        <Controller
          control={formControl}
          name={`cards.${index}.answer`}
          defaultValue={defaultValue.answer}
          shouldUnregister={true}
          render={({ field }) => (
            <Input
              placeholder="答え"
              _placeholder={{ color: "gray.300" }}
              onKeyDown={handleKeyDownAnswer}
              {...field}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export const CardEditor = Component;
