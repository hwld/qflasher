import { Box, BoxProps, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = BoxProps;

export const PageTitle: React.FC<Props> = ({ children, ...styles }) => {
  return (
    <Box
      padding={3}
      w="80%"
      bgColor="gray.700"
      boxShadow="dark-lg"
      borderRadius="md"
      {...styles}
    >
      <Heading fontSize={{ base: "xl", md: "2xl" }} textAlign="center">
        {children}
      </Heading>
    </Box>
  );
};