import { Box, BoxProps, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = BoxProps;

const Component: React.FC<Props> = ({ children, ...styleProps }) => {
  return (
    <Box
      padding={3}
      w="800px"
      bgColor="gray.700"
      mx="auto"
      boxShadow="dark-lg"
      borderRadius="md"
      {...styleProps}
    >
      <Heading fontSize="2xl" textAlign="center">
        {children}
      </Heading>
    </Box>
  );
};

export const PageTitle = Component;
