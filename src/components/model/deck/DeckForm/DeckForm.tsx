import { DeckFormInput } from "@/components/model/deck/DeckForm";
import { useDeckForm } from "@/components/model/deck/DeckForm/useDeckForm";
import { FlashCardEditor } from "@/components/model/flashCard/FlashCardEditor";
import { TagSelectProps, TagsSelect } from "@/components/model/tag/TagsSelect";
import { useDebounce } from "@/hooks/useDebounce";
import { Deck, FlashCard, Tag } from "@/types";
import { Box, Text } from "@chakra-ui/layout";
import { Button, Icon, useToast } from "@chakra-ui/react";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { MdAdd } from "react-icons/md";

export type DeckFormProps = {
  tags: Tag[];
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (arg: { newDeck: Deck; oldCards: FlashCard[] }) => void;
  onAddTag: TagSelectProps["onAddTag"];
  onDeleteTag: TagSelectProps["onDeleteTag"];
};

export const DeckForm: React.FC<DeckFormProps> = ({
  tags,
  defaultDeck = { id: "", name: "", cards: [], tagIds: [], cardLength: 0 },
  formId,
  onSubmit,
  onAddTag,
  onDeleteTag,
}) => {
  const toast = useToast();

  const {
    control,
    cardFields,
    errors,
    appendCardField,
    removeCardField,
    moveCardField,
    isFirstCard,
    isLastCard,
    firstCardId,
    lastCardId,
    nextCardId,
    prevCardId,
    focus,
    triggerValidation,
    handleSubmit,
  } = useDeckForm(defaultDeck, tags);

  const addCardEditor = () => {
    const result = appendCardField();
    if (result.type === "error") {
      toast({
        title: "エラー",
        description: result.message,
        status: "error",
        isClosable: true,
      });
      return;
    }
  };
  const addCardEditorWithDebounce = useDebounce(50, addCardEditor);

  const handleDeleteCard = (id: string) => {
    removeCardField(id);
  };

  const submit = ({ name, cards, tagIds, cardLength }: Omit<Deck, "id">) => {
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
        tagIds,
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
        focus("tags");
        return;
      }
    });
  };

  const handleFocusNextToSelect = () => {
    if (cardFields.length === 0) {
      addCardEditor();
    } else {
      focus("question", firstCardId());
    }
  };
  const handleFocusPrevSelect = () => {
    focus("deckName");
  };

  const handleKeyDownInQuestion = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter" && event.shiftKey) {
        if (isFirstCard(cardId)) {
          focus("tags");
        } else {
          focus("answer", prevCardId(cardId));
        }
        return;
      }

      if (event.key === "Enter") {
        focus("answer", cardId);
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
        focus("question", cardId);
        return;
      }

      if (event.key === "Enter") {
        if (isLastCard(cardId)) {
          addCardEditorWithDebounce();
        } else {
          focus("question", nextCardId(cardId));
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

    moveCardField(result.source.index, result.destination.index);
  };

  useEffect(() => {
    if (cardFields.length === 0) {
      focus("deckName");
    } else {
      focus("question", lastCardId());
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
      <Box
        mt={2}
        bgColor="gray.700"
        padding={5}
        borderRadius="md"
        boxShadow="dark-lg"
      >
        <Text fontWeight="bold" fontSize="xl">
          タグ
        </Text>
        <Box mt={3}>
          <TagsSelect
            control={control}
            tags={tags}
            defaultTagIds={defaultDeck.tagIds}
            onAddTag={onAddTag}
            onDeleteTag={onDeleteTag}
            onNextFocus={handleFocusNextToSelect}
            onPrevFocus={handleFocusPrevSelect}
          />
        </Box>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cardEditors">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {cardFields.map((field, i) => {
                return (
                  <FlashCardEditor
                    mt={2}
                    borderRadius="md"
                    boxShadow="dark-lg"
                    index={i}
                    formControl={control}
                    cardErrors={errors.cards}
                    key={field.id}
                    id={field.cardId}
                    onFocusField={focus}
                    onKeyDownInQuestion={handleKeyDownInQuestion}
                    onKeyDownInAnswer={handleKeyDownInAnswer}
                    onDelete={handleDeleteCard}
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
        bgColor="gray.500"
        _hover={{ bgColor: "gray.600" }}
        _active={{ bgColor: "gray.700" }}
      >
        <Icon as={MdAdd} boxSize="40px" />
        <Text fontWeight="bold">カードを追加</Text>
      </Button>
    </Box>
  );
};
