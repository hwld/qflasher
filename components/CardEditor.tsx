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
import React, {
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { MdDelete } from "react-icons/md";
import { FlashCard } from "../types";

export type CardEditorHandler = {
  focusQuestion: () => void;
  focusAnswer: () => void;
};

type Props = {
  index: number;
  card: FlashCard;
  onChangeField: (
    fields: Extract<keyof FlashCard, "answer" | "question">,
    id: string,
    value: string
  ) => void;
  onKeyDownInQuestion: (id: string, event: KeyboardEvent<Element>) => void;
  onKeyDownInAnswer: (id: string, event: KeyboardEvent<Element>) => void;
  onDelete: (id: string) => void;
} & BoxProps;

const Component = React.forwardRef<CardEditorHandler, Props>(
  function CardEditor(
    {
      index,
      card,
      onChangeField,
      onKeyDownInQuestion,
      onKeyDownInAnswer,
      onDelete,
      ...styleProps
    },
    ref
  ) {
    const questionInputRef = useRef<HTMLInputElement>(null);
    const answerInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return {
        focusQuestion() {
          questionInputRef.current?.focus();
        },
        focusAnswer() {
          answerInputRef.current?.focus();
        },
      };
    });

    const handleKeyDownQuestion: KeyboardEventHandler = (e) => {
      onKeyDownInQuestion(card.id, e);
    };

    const handleKeyDownAnswer: KeyboardEventHandler = (e) => {
      onKeyDownInAnswer(card.id, e);
    };

    const handleChangeQuestion: ChangeEventHandler<HTMLInputElement> = ({
      target: { value },
    }) => {
      onChangeField("question", card.id, value);
    };

    const handleChangeAnswer: ChangeEventHandler<HTMLInputElement> = ({
      target: { value },
    }) => {
      onChangeField("answer", card.id, value);
    };

    const handleDelete = () => {
      onDelete(card.id);
    };

    useEffect(() => {
      questionInputRef.current?.focus();
    }, []);

    return (
      <Box key={card.id} padding={5} pt={3} bgColor="gray.700" {...styleProps}>
        <Stack>
          <Flex justify="space-between">
            <Text fontWeight="bold" mr={2}>
              {index}.
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
          <Input
            ref={questionInputRef}
            placeholder="質問"
            _placeholder={{ color: "gray.300" }}
            value={card.question}
            onChange={handleChangeQuestion}
            onKeyDown={handleKeyDownQuestion}
          />

          <Input
            ref={answerInputRef}
            placeholder="答え"
            _placeholder={{ color: "gray.300" }}
            value={card.answer}
            onChange={handleChangeAnswer}
            onKeyDown={handleKeyDownAnswer}
          />
        </Stack>
      </Box>
    );
  }
);

export const CardEditor = Component;
