import { Flex, FlexProps, FormLabel, Switch } from "@chakra-ui/react";

type Props = {
  selectedTagId: string | undefined;
  onClickShowAll: () => void;
} & FlexProps;

export const ShowAllTagsSwitch: React.VFC<Props> = ({
  selectedTagId,
  onClickShowAll,
  ...props
}) => {
  const isAllSelected = selectedTagId === undefined;
  return (
    <Flex
      align="center"
      bgColor={isAllSelected ? "whiteAlpha.300" : "whiteAlpha.50"}
      color="gray.100"
      p={2}
      rounded="md"
      onClick={onClickShowAll}
      {...props}
    >
      <Switch colorScheme={"green"} id="all-decks" isChecked={isAllSelected} />
      <FormLabel
        color={isAllSelected ? "gray.50" : "gray.300"}
        htmlFor="all-decks"
        userSelect={"none"}
        m={0}
        ml={1}
        fontWeight={"bold"}
      >
        すべてのデッキを表示する
      </FormLabel>
    </Flex>
  );
};
