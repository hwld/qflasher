import { DeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { DeckWithoutCards } from "@/models";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  ListItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { forwardRef, ReactNode, useMemo } from "react";
import { MdPlayArrow } from "react-icons/md";

type DeckItemBaseProps = {
  cardStyle: DeckItemStyle;
  deck: DeckWithoutCards;
  menuButtons?: ReactNode;
  onPlayDeck: () => void;
} & FlexProps;

export const DeckItemBase = forwardRef<HTMLDivElement, DeckItemBaseProps>(
  function DeckItemBase(
    {
      deck,
      cardStyle: { height, cardWidth, nameFontSize, playButtonSize, ringWidth },
      menuButtons,
      onPlayDeck,
      ...styles
    },
    ref
  ) {
    const menu = useMemo(() => {
      return <Flex mt={1}>{menuButtons}</Flex>;
    }, [menuButtons]);

    return (
      <Flex
        {...styles}
        ref={ref}
        as={ListItem}
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
        />
        <Flex
          w={`${cardWidth}px`}
          h={`${height}px`}
          bgColor="gray.700"
          rounded="2xl"
          direction="column"
          justify="space-between"
          boxShadow={"lg"}
          py={3}
          px={4}
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

          <Flex shrink={0} align="flex-end" justify="space-between">
            <Flex direction="column">{menu}</Flex>
            <Flex>
              <Tooltip label="暗記">
                <Button
                  aria-label="go play settings"
                  boxSize={playButtonSize}
                  rounded="full"
                  colorScheme="green"
                  bgColor="green.300"
                  _hover={{ bgColor: "green.400" }}
                  _active={{ bgColor: "green.500" }}
                  color="gray.700"
                  padding={0}
                  onClick={onPlayDeck}
                  boxShadow="dark-lg"
                >
                  <MdPlayArrow size="80%" />
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);
