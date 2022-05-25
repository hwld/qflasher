import { Flex, Icon, Text } from "@chakra-ui/react";
import { RiPantoneLine } from "react-icons/ri";

export const NoDeckItem: React.VFC = () => {
  return (
    <Flex direction={"column"} align="center" opacity={0.5}>
      <Icon as={RiPantoneLine} fill="orange.500" boxSize={"36"} />
      <Text fontSize={"2xl"} fontWeight="bold">
        デッキがありません
      </Text>
    </Flex>
  );
};
