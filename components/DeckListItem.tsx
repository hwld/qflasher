import { Box, BoxProps, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdEdit, MdPlayArrow } from "react-icons/md";
import { RiPushpin2Fill } from "react-icons/ri";
import { useDeckListContext } from "../contexts/DeckListContext";
import { Deck } from "../types";
import { DeleteDeckButton } from "./DeleteDeckButton";

type Props = { className?: string; deck: Deck } & BoxProps;

const Component: React.FC<Props> = ({ className, deck, ...styleProps }) => {
  const router = useRouter();
  const { setDeckList } = useDeckListContext();
  const handlePlayDeck = () => {
    router.push(`/deck/${deck.id}/play`);
  };

  const handleDelete = () => {
    setDeckList((decks) => decks.filter((d) => d.id !== deck.id));
  };

  const leftWidth = 50;
  const rightWidth = 450;
  const height = 200;

  return (
    <Flex
      {...styleProps}
      align="center"
      w={`${leftWidth + rightWidth}px`}
      h={`${height}px`}
    >
      <Box
        w={`${leftWidth}px`}
        h={`${leftWidth * 2}px`}
        borderWidth="5px"
        borderStyle="solid"
        borderColor="green.400"
        borderRight="none"
        borderLeftRadius={`${leftWidth}px`}
        bgColor="gray.700"
        boxShadow="dark-lg"
      />
      <Flex
        w={`${rightWidth}px`}
        h={`${height}px`}
        bgColor="gray.700"
        borderRadius="20px"
        direction="column"
        justify="space-between"
        paddingTop={5}
        paddingLeft={5}
        paddingRight={3}
        paddingBottom={2}
        boxShadow="dark-lg"
      >
        <Flex justify="space-between" grow={1} minH={0}>
          <Flex direction="column" grow={1} minH={0}>
            <Text
              flexGrow={1}
              fontWeight="bold"
              fontSize="1.2rem"
              minH={0}
              overflowY="auto"
              wordBreak="break-all"
            >
              {deck.name}
            </Text>
            <Text
              flexGrow={0}
              flexShrink={0}
              fontWeight="bold"
              color="gray.300"
              ml={3}
              textOverflow="ellipsis"
              wordBreak="break-all"
            >
              枚数: {deck.cards.length}
            </Text>
          </Flex>
          <Tooltip label="固定">
            <Button
              ml={3}
              colorScheme="gray"
              boxSize="40px"
              rounded="full"
              padding={0}
              flexGrow={0}
              flexShrink={0}
            >
              <RiPushpin2Fill size="60%" />
            </Button>
          </Tooltip>
        </Flex>

        <Flex shrink={0} align="baseline" justify="space-between">
          <Flex>
            <DeleteDeckButton onDelete={handleDelete} />
            <Tooltip label="編集">
              <Button
                ml={2}
                colorScheme="gray"
                boxSize="40px"
                minW="none"
                rounded="full"
                padding={0}
              >
                <MdEdit size="60%" />
              </Button>
            </Tooltip>
          </Flex>
          <Flex>
            <Tooltip label="暗記">
              <Button
                boxSize="60px"
                borderRadius="50%"
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

export const DeckListItem = Component;
