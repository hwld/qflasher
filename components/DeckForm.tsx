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

  const addCardTimer = useRef<NodeJS.Timeout>();

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
    // addCardを非同期関数内でawaitのあとに呼び出すと、setCardsが呼び出されたあとにすぐrender関数が呼ばれ、
    // 更新前のcardMapを参照してしまうので必ずcardMapを更新したあとに呼び出す
    cardMap.current.set(id, createRef());
    setCards((cards) => [
      ...cards,
      { id, question: "", answer: "", deleted: false },
    ]);
    return id;
  };

  const handleAddCard = () => {
    addCard();
  };
  const handleDeleteCard = (id: string) => {
    cardMap.current.delete(id);
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, deleted: true };
        }
        return c;
      })
    );
  };

  const handleKeyDownTemplate = (event: KeyboardEvent, handler: () => void) => {
    if (event.key !== "Enter") {
      return;
    }
    if (event.ctrlKey) {
      submit();
      return;
    }
    handler();
  };

  const handleKeyDownInName: KeyboardEventHandler = (event) => {
    handleKeyDownTemplate(event, () => {
      if (existsCards.length === 0) {
        addCard();
      } else {
        cardMap.current.get(existsCards[0].id)?.current?.focusQuestion();
      }
    });
  };

  const handleKeyDownInQuestion = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
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
    });
  };

  const handleKeyDownInAnswer = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
      const cardIndex = existsCards.findIndex((c) => c.id === cardId);
      // shift + Enter で 前にフォーカスを移動する
      if (event.shiftKey) {
        // 同一cardのQuestionにフォーカスを当てる
        cardMap.current
          .get(existsCards[cardIndex].id)
          ?.current?.focusQuestion();
      } else {
        // 最後のcardだった場合、新たにcardを追加する
        if (cardIndex === existsCards.length - 1) {
          // カードの追加だけデバウンスを使用する
          if (addCardTimer.current) {
            clearTimeout(addCardTimer.current);
          }
          addCardTimer.current = setTimeout(() => {
            addCard();
          }, 50);
        } else {
          // 次のcardのQuestionにフォーカスを当てる
          cardMap.current
            .get(existsCards[cardIndex + 1].id)
            ?.current?.focusQuestion();
        }
      }
    });
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
          onKeyDown={handleKeyDownInName}
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
            onKeyDownInQuestion={handleKeyDownInQuestion}
            onKeyDownInAnswer={handleKeyDownInAnswer}
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
