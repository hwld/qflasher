import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEventHandler, useState } from "react";
import { CardEditor } from "../components/CardEditor";
import { Header } from "../components/Header";
import { useDeckListContext } from "../contexts/DeckListContext";
import { FlashCard } from "../types";

const DeckEditPage: NextPage = () => {
  const router = useRouter();
  const { setDeckList } = useDeckListContext();
  const [name, setName] = useState("");
  const [cards, setCards] = useState<FlashCard[]>([]);

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setName(value);
  };

  const handleAddCard = () => {
    setCards((cards) => [
      ...cards,
      { id: Math.random().toString(), question: "", answer: "" },
    ]);
  };

  const handleChangeQuestion = (id: string, value: string) => {
    setCards((cards) => {
      return cards.map((card) => {
        if (card.id === id) {
          return { ...card, question: value };
        }
        return card;
      });
    });
  };

  const handleChangeAnswer = (id: string, value: string) => {
    setCards((cards) => {
      return cards.map((card) => {
        if (card.id === id) {
          return { ...card, answer: value };
        }
        return card;
      });
    });
  };

  const handleDelete = (id: string) => {
    setCards((cards) => cards.filter((card) => card.id !== id));
  };

  const handleAddDeck = () => {
    console.log({ id: Math.random().toString(), name, cards });
    setDeckList((decks) => {
      return [...decks, { id: Math.random().toString(), name, cards }];
    });
    router.push("/deckList");
  };

  return (
    <Box minH="100vh">
      <Header />
      <Stack maxW="800px" margin="0 auto 100px">
        <Box>
          <Text>名前:</Text>
          <Input value={name} onChange={handleChangeName} />
        </Box>
        {cards.map((card) => {
          return (
            <CardEditor
              key={card.id}
              card={card}
              onChangeQuestion={handleChangeQuestion}
              onChangeAnswer={handleChangeAnswer}
              onDelete={handleDelete}
            />
          );
        })}
        <Button onClick={handleAddCard}>カードの追加</Button>
        <Button mt={10} colorScheme="green" onClick={handleAddDeck}>
          作成
        </Button>
      </Stack>
    </Box>
  );
};

export default DeckEditPage;
