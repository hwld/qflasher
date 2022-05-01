import { DeckWithoutCards } from "@/models";
import { Box, Stack, Text } from "@chakra-ui/react";

type Props = {
  deck: DeckWithoutCards;
};

export const PlaySettingHeader: React.VFC<Props> = ({ deck }) => {
  return (
    <Box bgColor={"gray.600"} w="100%" py={{ base: 14, md: 20 }}>
      <Stack w="93%" maxW="800px" mx="auto">
        <Text
          fontSize={{ base: "xl", md: "4xl" }}
          fontWeight="bold"
          whiteSpace={"nowrap"}
          overflow="hidden"
          textOverflow={"ellipsis"}
        >
          {deck.name}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }}>枚数: {deck.cardLength}</Text>
      </Stack>
    </Box>
  );
};
