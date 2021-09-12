import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  createRef,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdAdd } from "react-icons/md";
import { Deck } from "../types";
import { CardEditor, CardEditorHandler } from "./CardEditor";

type Props = {
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (deck: Deck) => void;
};

export const DeckForm: React.FC<Props> = ({
  defaultDeck = { id: "", name: "", cards: [] },
  formId,
  onSubmit,
}) => {
  const [name, setName] = useState(defaultDeck.name);
  const [cards, setCards] = useState(defaultDeck.cards);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const cardMap = useRef(
    new Map(
      defaultDeck.cards.map((card) => [card.id, createRef<CardEditorHandler>()])
    )
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit({ id: defaultDeck.id, name, cards });
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
    const id = Math.random().toString();
    setCards((cards) => [...cards, { id, question: "", answer: "" }]);
    cardMap.current.set(id, createRef());
    return id;
  };
  const handleAddCard = () => {
    addCard();
  };
  const handleDeleteCard = (id: string) => {
    setCards((cards) => cards.filter((c) => c.id !== id));
    cardMap.current.delete(id);
  };

  const handleKeyDownName: KeyboardEventHandler = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    if (event.ctrlKey) {
      onSubmit({ id: defaultDeck.id, name, cards });
      return;
    }

    if (cards.length === 0) {
      addCard();
    } else {
      cardMap.current.get(cards[0].id)?.current?.focusQuestion();
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
      onSubmit({ id: defaultDeck.id, name, cards });
      return;
    }

    const cardIndex = cards.findIndex((c) => c.id === cardId);
    // shift + Enter で 前にフォーカスを移動する
    if (event.shiftKey) {
      if (cardIndex === 0) {
        // 一番最初のcardだった場合、nameInputにフォーカスを当てる
        nameInputRef.current?.focus();
      } else {
        // それ以外は前のcardにフォーカスを当てる
        cardMap.current.get(cards[cardIndex - 1].id)?.current?.focusAnswer();
      }
    } else {
      // Enter のみで 同一cardのAnswerにフォーカスを当てる
      cardMap.current.get(cards[cardIndex].id)?.current?.focusAnswer();
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
      onSubmit({ id: defaultDeck.id, name, cards });
      return;
    }

    const cardIndex = cards.findIndex((c) => c.id === cardId);
    // shift + Enter で 前にフォーカスを移動する
    if (event.shiftKey) {
      // 同一cardのQuestionにフォーカスを当てる
      cardMap.current.get(cards[cardIndex].id)?.current?.focusQuestion();
    } else {
      // 最後のcardだった場合、新たにcardを追加する
      if (cardIndex === cards.length - 1) {
        addCard();
      } else {
        // 次のcardのQuestionにフォーカスを当てる
        cardMap.current.get(cards[cardIndex + 1].id)?.current?.focusQuestion();
      }
    }
  };

  useEffect(() => {
    if (cardMap.current.size === 0) {
      nameInputRef.current?.focus();
    } else {
      cardMap.current.get(cards[cards.length - 1].id)?.current?.focusAnswer();
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
      {cards.map((card) => {
        return (
          <CardEditor
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
