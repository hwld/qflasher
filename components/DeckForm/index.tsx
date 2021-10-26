import { Box, Text } from "@chakra-ui/layout";
import { Button, Input, useToast } from "@chakra-ui/react";
import React, {
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Deck, DeckWithoutCards, FlashCard } from "../../types";
import { CardEditor } from "./CardEditor";
import { useDeckForm } from "./useDeckForm";
import { useExistingCardIds } from "./useExistingCardIds";

// リストから削除すると削除すべきカードが特定できないので論理削除にする
export type FormFlashCard = FlashCard & { deleted: boolean };

export type FormFlashCardId = {
  value: FormFlashCard["id"];
  deleted: FormFlashCard["deleted"];
};

type Props = {
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (
    deckWithoutCards: DeckWithoutCards,
    cards: FormFlashCard[]
  ) => void;
};

export type DeckFormFields = {
  name: string;
  // cardsがそんざいしない可能性があるのでundefinedとのunionを取る
  cards: Omit<FlashCard, "id">[] | undefined;
};

export const DeckForm: React.FC<Props> = ({
  defaultDeck = { id: "", name: "", cards: [], cardLength: 0 },
  formId,
  onSubmit,
}) => {
  const toast = useToast();

  // questionやanswerはreact-hook-formで管理する
  const [cardIds, setCardIds] = useState<FormFlashCardId[]>(
    defaultDeck.cards.map((c) => ({ value: c.id, deleted: false }))
  );

  const {
    existingCardIds,
    isFirstCard,
    isLastCard,
    firstCardId,
    prevCardId,
    nextCardId,
    lastCardId,
  } = useExistingCardIds(cardIds);

  const {
    control,
    focusDeckName,
    focusQuestion,
    focusAnswer,
    handleSubmit,
    triggerValidation,
    errors,
  } = useDeckForm({
    formCardIds: existingCardIds,
  });

  const addCardTimer = useRef<number>();

  const submit = (fields: DeckFormFields) => {
    if (fields.cards === undefined) {
      addCardEditor();
      triggerValidation();
      return;
    }

    // cardsの情報とreact-hook-formの情報からFormFlashCardsを作成する
    const formCards: FormFlashCard[] = cardIds.map((formCardId) => {
      const index = existingCardIds.findIndex((id) => id === formCardId.value);
      if (index === -1) {
        // 削除されている場合は情報が存在しないので空文字にする
        return {
          id: formCardId.value,
          question: "",
          answer: "",
          deleted: formCardId.deleted,
        };
      }

      if (fields.cards === undefined) {
        throw new Error();
      }

      const field = fields.cards[index];
      if (!fields) {
        throw new Error();
      }

      return {
        id: formCardId.value,
        question: field.question,
        answer: field.answer,
        deleted: formCardId.deleted,
      };
    });

    onSubmit(
      {
        id: defaultDeck.id,
        name: fields.name,
        cardLength: existingCardIds.length,
      },
      formCards
    );
  };

  const addCardEditor = () => {
    if (existingCardIds.length >= 100) {
      toast({
        title: "エラー",
        description: "カードは100枚までしか作れません",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const id = uuidv4();
    setCardIds((ids) => [...ids, { value: id, deleted: false }]);
    return id;
  };

  const handleDeleteCardEditor = (targetId: string) => {
    setCardIds((ids) =>
      ids.map((id) => {
        if (id.value === targetId) {
          return { ...id, deleted: true };
        }
        return id;
      })
    );
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
        if (existingCardIds.length === 0) {
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
          if (addCardTimer.current) {
            clearTimeout(addCardTimer.current);
          }
          addCardTimer.current = window.setTimeout(() => {
            addCardEditor();
          }, 50);
        } else {
          focusQuestion(nextCardId(cardId));
        }
        return;
      }
    });
  };

  useEffect(() => {
    if (existingCardIds.length === 0) {
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
      <Box
        bgColor="gray.700"
        padding={5}
        borderTopRadius="3xl"
        borderBottomRadius="md"
        boxShadow="dark-lg"
      >
        <Text fontWeight="bold" fontSize="xl">
          名前
        </Text>
        <Controller
          control={control}
          name="name"
          defaultValue={defaultDeck.name}
          rules={{
            required: { value: true, message: "文字を入力してください" },
            maxLength: { value: 50, message: "50文字以下で入力してください" },
          }}
          render={({ field }) => (
            <Input
              mt={3}
              autoComplete="off"
              spellCheck={false}
              isInvalid={!!errors.name}
              colorScheme="green"
              onKeyDown={handleKeyDownInName}
              {...field}
            />
          )}
        />
        {errors.name?.message && (
          <Text ml={3} my={2} color="red">
            ※{errors.name.message}
          </Text>
        )}
      </Box>
      {existingCardIds.map((id, i) => {
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
            onDelete={handleDeleteCardEditor}
          />
        );
      })}
      <Button
        mt={2}
        w="100%"
        h="50px"
        borderTopRadius="md"
        borderBottomRadius="3xl"
        boxShadow="dark-lg"
        onClick={addCardEditor}
      >
        <MdAdd size="100%" />
      </Button>
    </Box>
  );
};
