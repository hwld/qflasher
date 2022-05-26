import { Box, Button, Flex, Tooltip } from "@chakra-ui/react";
import { RiAddFill } from "react-icons/ri";

type Props = {
  onClickAddTag: () => void;
};

export const TagsSideViewHeader: React.VFC<Props> = ({ onClickAddTag }) => {
  return (
    <Flex bgColor="gray.500" h="30px" alignItems="center">
      <Box flexGrow={1} />
      <Tooltip label="タグの追加">
        <Button
          boxSize="25px"
          variant={"outline"}
          borderColor="orange.300"
          color={"orange.300"}
          mr={1}
          minW="none"
          p={0}
          rounded={"sm"}
          onClick={onClickAddTag}
        >
          <RiAddFill size="90%" />
        </Button>
      </Tooltip>
    </Flex>
  );
};
