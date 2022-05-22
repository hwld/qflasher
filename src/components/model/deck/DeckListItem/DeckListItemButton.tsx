import { Button, ButtonProps } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { forwardRef } from "react";

type Props = ButtonProps & { label: string };

export const DeckListItemButton = forwardRef<HTMLButtonElement, Props>(
  function DeckListItemButton({ children, label, onClick, ...styles }, ref) {
    return (
      <Tooltip label={label}>
        <Button
          ref={ref}
          colorScheme="gray"
          minW="none"
          boxSize="25px"
          rounded="md"
          padding={0}
          onClick={onClick}
          {...styles}
        >
          {children}
        </Button>
      </Tooltip>
    );
  }
);
