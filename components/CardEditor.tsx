import { Box, BoxProps, Button, Flex, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { MdDelete } from "react-icons/md";
import { FlashCard } from "../types";

export type CardEditorHandler = {
  focusFirst: () => void;
  focusLast: () => void;
};

type Props = {
  card: FlashCard;
  onChangeQuestion: (id: string, value: string) => void;
  onChangeAnswer: (id: string, value: string) => void;
  onPrevFocus: (id: string) => void;
  onNextFocus: (id: string) => void;
  onDelete: (id: string) => void;
} & BoxProps;

const Component = React.forwardRef<CardEditorHandler, Props>(
  function CardEditor(
    {
      card,
      onChangeQuestion,
      onChangeAnswer,
      onPrevFocus,
      onNextFocus,
      onDelete,
      ...styleProps
    },
    ref
  ) {
    const questionInputRef = useRef<HTMLInputElement>(null);
    const answerInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return {
        focusFirst() {
          questionInputRef.current?.focus();
        },
        focusLast() {
          answerInputRef.current?.focus();
        },
      };
    });

    const handleKeyDownQuestion: KeyboardEventHandler = (e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          onPrevFocus(card.id);
        } else {
          answerInputRef.current?.focus();
        }
      }
    };

    const handleKeyDownAnswer: KeyboardEventHandler = (e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          questionInputRef.current?.focus();
        } else {
          onNextFocus(card.id);
        }
      }
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
          <Button
            ml={5}
            boxSize="40px"
            colorScheme="red"
            onClick={handleDelete}
            padding={0}
          >
            <MdDelete size="50%" />
          </Button>
        </Flex>
      </Box>
    );
  }
);

export const CardEditor = Component;
