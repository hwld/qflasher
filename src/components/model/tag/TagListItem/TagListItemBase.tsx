import { Box, BoxProps, Flex, Icon, ListItem } from "@chakra-ui/react";
import { forwardRef } from "react";
import { AiFillTag } from "react-icons/ai";

export type TagListItemLayoutProps = {
  onClickItem?: () => void;
  selected?: boolean;
} & BoxProps;

export const TagListItemBase = forwardRef<
  HTMLDivElement,
  TagListItemLayoutProps
>(function TagListItemBase(
  { children, selected = false, onClickItem = () => {}, ...props },
  ref
) {
  return (
    // role="group"にaria-selectedが指定できないため
    <Box ref={ref} role="group" {...props}>
      <ListItem
        rounded="md"
        aria-selected={selected}
        _selected={{ bgColor: "whiteAlpha.300" }}
        transitionDuration="250ms"
      >
        <Flex
          rounded="md"
          p={1}
          align="center"
          _hover={{ bgColor: "whiteAlpha.200" }}
          transitionDuration="250ms"
          // 子要素がクリックされたときにactiveが適用されないようにする
          // 例えば更新・削除ボタンなど
          sx={{
            "&:active:not(:focus-within)": { bgColor: "whiteAlpha.200" },
          }}
          onClick={onClickItem}
        >
          <Icon as={AiFillTag} mr={2} />
          {children}
        </Flex>
      </ListItem>
    </Box>
  );
});
