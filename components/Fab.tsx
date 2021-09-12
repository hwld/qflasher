import { Box, Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import React from "react";

type Props = { tooltipLabel?: string } & ButtonProps;

const Component: React.FC<Props> = ({ children, tooltipLabel, ...props }) => {
  return (
    <Box h="120px">
      <Tooltip label={tooltipLabel}>
        <Button
          zIndex="1"
          position="fixed"
          bgColor="orange.300"
          _hover={{ bgColor: "orange.400" }}
          _active={{ bgColor: "orange.500" }}
          color="gray.700"
          bottom="20px"
          right="20px"
          padding={0}
          boxSize="70px"
          rounded="full"
          boxShadow="dark-lg"
          {...props}
        >
          {children}
        </Button>
      </Tooltip>
    </Box>
  );
};

export const Fab = Component;
