import {
  Box,
  BoxProps,
  Button,
  Flex,
  Input,
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
  onChangeQuestion: (id: string, value: string) => void;
  onChangeAnswer: (id: string, value: string) => void;
  onKeyDownQuestion: (id: string, event: KeyboardEvent<Element>) => void;
  onKeyDownAnswer: (id: string, event: KeyboardEvent<Element>) => void;
  onDelete: (id: string) => void;
} & BoxProps;

const Component = React.forwardRef<CardEditorHandler, Props>(
  function CardEditor(
    {
      index,
      card,
      onChangeQuestion,
      onChangeAnswer,
      onKeyDownQuestion,
      onKeyDownAnswer,
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
      onKeyDownQuestion(card.id, e);
    };

    const handleKeyDownAnswer: KeyboardEventHandler = (e) => {
      onKeyDownAnswer(card.id, e);
    };

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

    useEffect(() => {
      questionInputRef.current?.focus();
    }, []);

    return (
      <Box key={card.id} padding={5} bgColor="gray.700" {...styleProps}>
        <Flex align="center">
          <Text fontWeight="bold" mr={2}>
            {index}.
          </Text>
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
            ml={3}
            placeholder="答え"
            _placeholder={{ color: "gray.300" }}
            value={card.answer}
            onChange={handleChangeAnswer}
            onKeyDown={handleKeyDownAnswer}
          />
          <Tooltip label="削除">
            <Button
              ml={5}
              boxSize="40px"
              variant="outline"
              colorScheme="red"
              onClick={handleDelete}
              padding={0}
            >
              <MdDelete size="60%" />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
    );
  }
);

export const CardEditor = Component;
