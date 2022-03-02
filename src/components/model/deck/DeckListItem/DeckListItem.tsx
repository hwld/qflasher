import {
  deckCardStyle,
  DeckListItemButton,
} from "@/components/model/deck/DeckListItem";
import { useTagDrop } from "@/hooks/useTagDnD";
import { DeckWithoutCards } from "@/types";
import { Box, BoxProps, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdDelete, MdEdit, MdPlayArrow } from "react-icons/md";

export type DeckListItemProps = {
  style: deckCardStyle;
  deck: DeckWithoutCards;
  onDeleteDeck: (id: string) => Promise<void>;
  onTagDeck: (deckId: string, tagId: string) => unknown;
} & BoxProps;

export const DeckListItem: React.FC<DeckListItemProps> = ({
  style: { ringWidth, cardWidth, height, nameFontSize, metaFontSize },
  deck,
  onDeleteDeck,
  onTagDeck,
  ...styles
}) => {
  const router = useRouter();
  const [{ hovered }, dropRef] = useTagDrop(() => ({
    drop: (tag) => {
      onTagDeck(deck.id, tag.id);
    },
    collect: (monitor) => {
      return { hovered: monitor.isOver() };
    },
  }));

  const handlePlayDeck = () => {
    router.push({ pathname: "/decks/play", query: { id: deck.id } });
  };

  const handleUpdateDeck = () => {
    router.push({ pathname: "/decks/edit", query: { id: deck.id } });
  };

  const handleDelete = () => {
    onDeleteDeck(deck.id);
  };

  return (
    <Flex
      {...styles}
      opacity={hovered ? 0.5 : 1}
      ref={dropRef}
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
              <DeckListItemButton label="削除" onClick={handleDelete}>
                <MdDelete size="60%" />
              </DeckListItemButton>
              <DeckListItemButton
                ml={2}
                label="編集"
                onClick={handleUpdateDeck}
              >
                <MdEdit size="60%" />
              </DeckListItemButton>
            </Flex>
          </Flex>
          <Flex>
            <Tooltip label="暗記">
              <Button
                boxSize={{ base: "40px", md: "60px" }}
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
