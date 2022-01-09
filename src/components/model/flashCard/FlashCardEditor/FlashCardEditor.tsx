import {
  DeckFormFields,
  DeckFormInput,
} from "@/components/model/deck/DeckForm";
import { CardEditorHeader } from "@/components/model/flashCard/FlashCardEditor";
import { FlashCard } from "@/types";
import { Box, BoxProps, Stack } from "@chakra-ui/react";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Control, FormState, UseFormReset } from "react-hook-form";

type Props = {
  index: number;
  id: string;
  formControl: Control<DeckFormFields, object>;
  resetForm: UseFormReset<DeckFormFields>;
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
  resetForm,
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

  const deleteCard = () => {
    // カードを削除するとindexがひとつずれて、最後のカードの情報が内部に残ってしまうので
    // 削除する前に一度リセットする。
    resetForm();
    onDelete(id);
  };

  const handleKeyDownTemplate = (e: KeyboardEvent, handler: () => void) => {
    if (e.ctrlKey && e.key === "x") {
      deleteCard();
      return;
    }
    handler();
  };

  const handleKeyDownQuestion: KeyboardEventHandler = (e) => {
    handleKeyDownTemplate(e, () => {
      onKeyDownInQuestion(id, e);
    });
  };

  const handleKeyDownAnswer: KeyboardEventHandler = (e) => {
    handleKeyDownTemplate(e, () => {
      onKeyDownInAnswer(id, e);
    });
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
                onDeleteEditor={deleteCard}
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
