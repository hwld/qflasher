import { Button, ButtonProps } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";

type Props = ButtonProps & { label: string };

export const DeckListItemButton: React.FC<Props> = ({
  children,
  label,
  onClick,
  ...styles
}) => {
  return (
    <Tooltip label={label}>
      <Button
        colorScheme="gray"
        minW="none"
        boxSize="30px"
        rounded="full"
        padding={0}
        onClick={onClick}
        {...styles}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
