import {
  Box,
  BoxProps,
  Button,
  Flex,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdEdit, MdPlayArrow } from "react-icons/md";
import { RiPushpin2Fill } from "react-icons/ri";
import { useSetAppState } from "../../context/AppStateContextProvider";
import { DeckWithoutCards } from "../../types";
import { DeckCardButton } from "./DeckCardButton";
import { DeleteDeckButton } from "./DeleteDeckButton";
import { deckCardStyle } from "./useDeckCardStyle";

type Props = {
  style: deckCardStyle;
  deck: DeckWithoutCards;
  onDeleteDeck: (id: string) => Promise<void>;
} & BoxProps;

export const DeckCard: React.FC<Props> = ({
  style: { ringWidth, cardWidth, height, nameFontSize, metaFontSize },
  deck,
  onDeleteDeck,
  ...styles
}) => {
  const router = useRouter();
  const toast = useToast();
  const { startLoading, endLoading } = useSetAppState();

  const handlePlayDeck = () => {
    router.push({ pathname: "/decks/play", query: { id: deck.id } });
  };

  const handleUpdateDeck = () => {
    router.push({ pathname: "/decks/edit", query: { id: deck.id } });
  };

  const handleDelete = async () => {
    let id = startLoading();
    try {
      await onDeleteDeck(deck.id);
    } catch (e) {
      endLoading(id);
      toast({
        title: "エラー",
        description: "エラーが発生しました",
        status: "error",
      });
    } finally {
      endLoading(id);
    }
  };

  return (
    <Flex
      {...styles}
      align="center"
      w={`${ringWidth + cardWidth}px`}
      h={`${height}px`}
    >
      <Box
        w={`${ringWidth}px`}
        h={`${ringWidth * 2}px`}
        borderWidth="5px"
        borderStyle="solid"
        borderColor="green.400"
        borderRight="none"
        borderLeftRadius={`${ringWidth}px`}
        bgColor="gray.700"
        boxShadow="dark-lg"
      />
      <Flex
        w={`${cardWidth}px`}
        h={`${height}px`}
        bgColor="gray.700"
        rounded="2xl"
        direction="column"
        justify="space-between"
        p={3}
        paddingLeft={5}
        boxShadow="dark-lg"
      >
        <Flex justify="space-between" grow={1} minH={0}>
          <Flex direction="column" grow={1} minH={0}>
            <Text
              flexGrow={1}
              fontWeight="bold"
              fontSize={nameFontSize}
              minH={0}
              overflowY="auto"
              wordBreak="break-all"
            >
              {deck.name}
            </Text>
          </Flex>
          <DeckCardButton ml={3} label="固定" flexShrink={0}>
            <RiPushpin2Fill size="60%" />
          </DeckCardButton>
        </Flex>

        <Flex shrink={0} align="end" justify="space-between">
          <Flex direction="column">
            <Text
              flexGrow={0}
              flexShrink={0}
              fontSize={metaFontSize}
              fontWeight="bold"
              color="gray.300"
              ml={2}
              textOverflow="ellipsis"
              wordBreak="break-all"
            >
              枚数: {deck.cardLength}
            </Text>
            <Flex mt={1}>
              <DeleteDeckButton onDelete={handleDelete} />
              <DeckCardButton ml={2} label="編集" onClick={handleUpdateDeck}>
                <MdEdit size="60%" />
              </DeckCardButton>
            </Flex>
          </Flex>
          <Flex>
            <Tooltip label="暗記">
              <Button
                boxSize="60px"
                rounded="full"
                colorScheme="green"
                bgColor="green.300"
                _hover={{ bgColor: "green.400" }}
                _active={{ bgColor: "green.500" }}
                color="gray.700"
                padding={0}
                onClick={handlePlayDeck}
              >
                <MdPlayArrow size="70%" />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
