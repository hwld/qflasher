import { Button, ButtonProps } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { forwardRef } from "react";

type Props = ButtonProps & { label: string };

export const DeckItemButton = forwardRef<HTMLButtonElement, Props>(
  function DeckItemButton({ children, label, onClick, ...styles }, ref) {
    return (
      <Tooltip label={label}>
        <Button
          ref={ref}
          colorScheme="gray"
          minW="none"
          boxSize="28px"
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
