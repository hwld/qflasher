import { Center, Heading } from "@chakra-ui/layout";
import React from "react";

export const NotFoundDeckPage: React.FC = () => {
  return (
    <Center mt={5}>
      <Heading>存在しないデッキです</Heading>
    </Center>
  );
};
