import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { DeckListContextProvider } from "../contexts/DeckListContext";
import { theme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DeckListContextProvider>
        <Component {...pageProps} />
      </DeckListContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
