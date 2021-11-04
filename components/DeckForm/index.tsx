import { Box, Text } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { MdAdd } from "react-icons/md";
import { useDebounce } from "../../hooks/useDebounce";
import { Deck, FlashCard } from "../../types";
import { CardEditor } from "./CardEditor";
import { DeckFormInput } from "./DeckFormInput";
import { useCardIds } from "./useCardIds";
import { useDeckForm } from "./useDeckForm";

export type DeckFormProps = {
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (arg: { newDeck: Deck; oldCards: FlashCard[] }) => void;
};

export type DeckFormFields = {
  name: string;
  // cardsがそんざいしない可能性があるのでundefinedとのunionを取る
  cards: Omit<FlashCard, "id">[] | undefined;
};

export const DeckForm: React.FC<DeckFormProps> = ({
  defaultDeck = { id: "", name: "", cards: [], cardLength: 0 },
  formId,
  onSubmit,
}) => {
  const toast = useToast();

  // questionやanswerはreact-hook-formで管理する
  const {
    cardIds,
    addCardId,
    deleteCardId,
    reorderCardIds,
    isFirstCard,
    isLastCard,
    firstCardId,
    prevCardId,
    nextCardId,
    lastCardId,
  } = useCardIds(defaultDeck.cards.map((c) => c.id));

  const {
    control,
    focusDeckName,
    focusQuestion,
    focusAnswer,
    handleSubmit,
    triggerValidation,
    errors,
  } = useDeckForm({
    formCardIds: cardIds,
  });

  const addCardEditor = useDebounce(50, () => {
    const result = addCardId();
    if (result.type === "error") {
      toast({
        title: "エラー",
        description: result.message,
        status: "error",
        isClosable: true,
      });
      return;
    }
  });

  const submit = ({ name, cardLength, cards }: Omit<Deck, "id">) => {
    if (cards.length === 0) {
      addCardEditor();
      triggerValidation();
      return;
    }

    onSubmit({
      newDeck: {
        id: defaultDeck.id,
        name,
        cards,
        cardLength,
      },
      oldCards: defaultDeck.cards,
    });
  };

  const handleKeyDownTemplate = (event: KeyboardEvent, handler: () => void) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSubmit(submit)();
      return;
    }
    handler();
  };

  const handleKeyDownInName: KeyboardEventHandler = (event) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter") {
        if (cardIds.length === 0) {
          addCardEditor();
        } else {
          focusQuestion(firstCardId());
        }
        return;
      }
    });
  };

  const handleKeyDownInQuestion = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter" && event.shiftKey) {
        if (isFirstCard(cardId)) {
          focusDeckName();
        } else {
          focusAnswer(prevCardId(cardId));
        }
        return;
      }

      if (event.key === "Enter") {
        focusAnswer(cardId);
        return;
      }
    });
  };

  const handleKeyDownInAnswer = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter" && event.shiftKey) {
        focusQuestion(cardId);
        return;
      }

      if (event.key === "Enter") {
        if (isLastCard(cardId)) {
          addCardEditor();
        } else {
          focusQuestion(nextCardId(cardId));
        }
        return;
      }
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    reorderCardIds(result.source.index, result.destination.index);
  };

  useEffect(() => {
    if (cardIds.length === 0) {
      focusDeckName();
    } else {
      focusQuestion(lastCardId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {/* Enterが入力されてもsubmitが発生しないように独立させる。 */}
      <form id={formId} onSubmit={handleSubmit(submit)}></form>
      <Box bgColor="gray.700" padding={5} borderRadius="md" boxShadow="dark-lg">
        <Text fontWeight="bold" fontSize="xl">
          デッキ名
        </Text>
        <DeckFormInput
          control={control}
          name="name"
          error={errors.name}
          controllerProps={{
            defaultValue: defaultDeck.name,
            rules: {
              required: { value: true, message: "文字を入力してください" },
              maxLength: { value: 50, message: "50文字以下で入力してください" },
            },
          }}
          placeholder="デッキ名"
          onKeyDown={handleKeyDownInName}
          mt={3}
        />
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cardEditors">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {cardIds.map((id, i) => {
                return (
                  <CardEditor
                    mt={2}
                    borderRadius="md"
                    boxShadow="dark-lg"
                    index={i}
                    formControl={control}
                    cardErrors={errors.cards}
                    key={id}
                    id={id}
                    defaultValue={defaultDeck.cards.find((c) => c.id === id)}
                    onFocusQuestion={focusQuestion}
                    onKeyDownInQuestion={handleKeyDownInQuestion}
                    onKeyDownInAnswer={handleKeyDownInAnswer}
                    onDelete={deleteCardId}
                  />
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        mt={2}
        w="100%"
        h="50px"
        borderRadius="md"
        boxShadow="dark-lg"
        onClick={addCardEditor}
      >
        <MdAdd size="100%" />
      </Button>
    </Box>
  );
};
