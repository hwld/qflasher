import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  createRef,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Deck, DeckWithoutCards, FlashCard } from "../types";
import { CardEditor, CardEditorHandler } from "./CardEditor";

export type FormFlashCard = FlashCard & { deleted: boolean };

type Props = {
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (
    deckWithoutCards: DeckWithoutCards,
    cards: FormFlashCard[]
  ) => void;
};

export const DeckForm: React.FC<Props> = ({
  defaultDeck = { id: "", name: "", cards: [] },
  formId,
  onSubmit,
}) => {
  const [name, setName] = useState(defaultDeck.name);
  const [cards, setCards] = useState<FormFlashCard[]>(
    defaultDeck.cards.map((c) => ({ ...c, deleted: false }))
  );

  const existsCards = useMemo(() => {
    return cards.filter((c) => !c.deleted);
  }, [cards]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const cardMap = useRef(
    new Map(
      defaultDeck.cards.map((card) => [card.id, createRef<CardEditorHandler>()])
    )
  );

  const submit = () => {
    onSubmit(
      {
        id: defaultDeck.id,
        name,
        cardLength: cards.filter((c) => !c.deleted).length,
      },
      cards
    );
  };
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submit();
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setName(value);
  };
  const handleChangeQuestion = (id: string, question: string) => {
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, question };
        }
        return c;
      })
    );
  };
  const handleChangeAnswer = (id: string, answer: string) => {
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, answer };
        }
        return c;
      })
    );
  };

  const addCard = () => {
    const id = uuidv4();
    setCards((cards) => [
      ...cards,
      { id, question: "", answer: "", deleted: false },
    ]);
    cardMap.current.set(id, createRef());
    return id;
  };

  const handleAddCard = () => {
    addCard();
  };
  const handleDeleteCard = (id: string) => {
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, deleted: true };
        }
        return c;
      })
    );
    cardMap.current.delete(id);
  };

  const handleKeyDownName: KeyboardEventHandler = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    if (event.ctrlKey) {
      submit();
      return;
    }

    if (existsCards.length === 0) {
      addCard();
    } else {
      cardMap.current.get(existsCards[0].id)?.current?.focusQuestion();
    }
  };

  const handleKeyDownQuestion = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    // ctrl + Enter　で Deckを作成する
    if (event.ctrlKey) {
      submit();
      return;
    }

    const cardIndex = existsCards.findIndex((c) => c.id === cardId);
    // shift + Enter で 前にフォーカスを移動する
    if (event.shiftKey) {
      if (cardIndex === 0) {
        // 一番最初のcardだった場合、nameInputにフォーカスを当てる
        nameInputRef.current?.focus();
      } else {
        // それ以外は前のcardにフォーカスを当てる
        cardMap.current
          .get(existsCards[cardIndex - 1].id)
          ?.current?.focusAnswer();
      }
    } else {
      // Enter のみで 同一cardのAnswerにフォーカスを当てる
      cardMap.current.get(existsCards[cardIndex].id)?.current?.focusAnswer();
    }
  };

  const handleKeyDownAnswer = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    // ctrl + Enter　で Deckを作成する
    if (event.ctrlKey) {
      submit();
      return;
    }

    const cardIndex = existsCards.findIndex((c) => c.id === cardId);
    // shift + Enter で 前にフォーカスを移動する
    if (event.shiftKey) {
      // 同一cardのQuestionにフォーカスを当てる
      cardMap.current.get(existsCards[cardIndex].id)?.current?.focusQuestion();
    } else {
      // 最後のcardだった場合、新たにcardを追加する
      if (cardIndex === existsCards.length - 1) {
        addCard();
      } else {
        // 次のcardのQuestionにフォーカスを当てる
        cardMap.current
          .get(existsCards[cardIndex + 1].id)
          ?.current?.focusQuestion();
      }
    }
  };

  useEffect(() => {
    if (cardMap.current.size === 0) {
      nameInputRef.current?.focus();
    } else {
      cardMap.current
        .get(existsCards[existsCards.length - 1].id)
        ?.current?.focusAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {/* Enterが入力されてもsubmitが発生しないように独立させる。 */}
      <form id={formId} onSubmit={handleSubmit}></form>
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
        <Input
          ref={nameInputRef}
          mt={3}
          value={name}
          colorScheme="green"
          onChange={handleChangeName}
          onKeyDown={handleKeyDownName}
        />
      </Box>
      {existsCards.map((card, i) => {
        return (
          <CardEditor
            index={i + 1}
            ref={cardMap.current.get(card.id)}
            mt={2}
            borderRadius="md"
            boxShadow="dark-lg"
            key={card.id}
            card={card}
            onChangeQuestion={handleChangeQuestion}
            onChangeAnswer={handleChangeAnswer}
            onKeyDownQuestion={handleKeyDownQuestion}
            onKeyDownAnswer={handleKeyDownAnswer}
            onDelete={handleDeleteCard}
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
        onClick={handleAddCard}
      >
        <MdAdd size="100%" />
      </Button>
    </Box>
  );
};
