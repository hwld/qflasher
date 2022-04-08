import { DeckFormBox } from "@/components/model/deck/DeckForm/DeckFormBox";
import { DeckFormInput } from "@/components/model/deck/DeckForm/DeckFormInput";
import {
  DeckFormFields,
  useDeckForm,
} from "@/components/model/deck/DeckForm/useDeckForm";
import { CardEditorHeader } from "@/components/model/deckCard/DeckCardEditor/DeckCardEditorHeader";
import { BoxProps, Stack } from "@chakra-ui/react";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Control, FormState } from "react-hook-form";

type Props = {
  index: number;
  id: string;
  formControl: Control<DeckFormFields, object>;
  cardErrors: FormState<DeckFormFields>["errors"]["cards"];
  onFocusField: ReturnType<typeof useDeckForm>["focus"];
  onKeyDownInQuestion: (id: string, event: KeyboardEvent<Element>) => void;
  onKeyDownInAnswer: (id: string, event: KeyboardEvent<Element>) => void;
  onDelete: (id: string) => void;
} & Omit<BoxProps, "defaultValue">;

export const DeckCardEditor: React.FC<Props> = ({
  index,
  id,
  formControl,
  cardErrors,
  onFocusField,
  onKeyDownInQuestion,
  onKeyDownInAnswer,
  onDelete,
  ...styles
}) => {
  const questionError = cardErrors?.[index]?.question;
  const answerError = cardErrors?.[index]?.answer;

  const deleteCard = () => {
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
    onFocusField("question", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Draggable draggableId={id} index={index}>
      {(provider) => {
        return (
          <DeckFormBox
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
          </DeckFormBox>
        );
      }}
    </Draggable>
  );
};
