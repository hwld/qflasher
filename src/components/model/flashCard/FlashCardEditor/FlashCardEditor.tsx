import { Box, BoxProps, Stack } from "@chakra-ui/react";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Control, FormState } from "react-hook-form";
import { FlashCard } from "../../../../types";
import { DeckFormInput } from "../../deck/DeckForm/DeckFormInput";
import { DeckFormFields } from "../../deck/DeckForm/useDeckForm";
import { CardEditorHeader } from "./FlashCardEditorHeader";

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

export const FlashCardEditor: React.FC<Props> = ({
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
    <Draggable draggableId={id} index={index}>
      {(provider) => {
        return (
          <Box
            padding={5}
            pt={3}
            bgColor="gray.700"
            {...styles}
            ref={provider.innerRef}
            {...provider.draggableProps}
          >
            <Stack>
              <CardEditorHeader
                index={index}
                onDeleteEditor={handleDelete}
                dragHandle={provider.dragHandleProps}
              />
              <DeckFormInput
                control={formControl}
                name={`cards.${index}.question`}
                error={questionError}
                controllerProps={{
                  defaultValue: defaultValue.question,
                  rules: {
                    required: {
                      value: true,
                      message: "文字を入力してください",
                    },
                    maxLength: {
                      value: 100,
                      message: "100文字以下で入力してください。",
                    },
                  },
                }}
                onKeyDown={handleKeyDownQuestion}
                placeholder="質問"
              />
              <DeckFormInput
                control={formControl}
                name={`cards.${index}.answer`}
                error={answerError}
                controllerProps={{
                  defaultValue: defaultValue.answer,
                  rules: {
                    required: {
                      value: true,
                      message: "文字を入力してください",
                    },
                    maxLength: {
                      value: 100,
                      message: "100文字以下で入力してください。",
                    },
                  },
                }}
                onKeyDown={handleKeyDownAnswer}
                placeholder="答え"
              />
            </Stack>
          </Box>
        );
      }}
    </Draggable>
  );
};
