import { Center, Heading } from "@chakra-ui/layout";
import React from "react";

export const DeckLoadingErrorPage: React.FC = () => {
  return (
    <Center mt={5}>
      <Heading>デッキの読み込みに失敗しました</Heading>
    </Center>
  );
};
