import { Box, BoxProps, Text } from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = { title?: string } & BoxProps;

// eslint-disable-next-line react/display-name
export const DeckFormBox = forwardRef<HTMLDivElement, Props>(
  ({ children, title, ...styles }, ref) => {
    return (
      <Box
        bgColor="gray.700"
        pt={3}
        pb={5}
        px={5}
        borderRadius="md"
        boxShadow="dark-lg"
        ref={ref}
        {...styles}
      >
        {title && (
          <Text fontWeight={"bold"} fontSize="xl">
            {title}
          </Text>
        )}
        {children}
      </Box>
    );
  }
);
