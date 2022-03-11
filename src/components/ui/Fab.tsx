import { Box, Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import React from "react";

type Props = { tooltipLabel?: string } & ButtonProps;

export const Fab: React.FC<Props> = ({ children, tooltipLabel, ...props }) => {
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
          bottom={{ base: "10px", md: "20px" }}
          right={{ base: "10px", md: "20px" }}
          padding={0}
          boxSize={{ base: "50px", md: "70px" }}
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
