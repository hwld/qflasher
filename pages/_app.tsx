import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { DeckListContextProvider } from "../contexts/DeckListContext";
import { FirebaseProvider } from "../firebase/provider";
import { theme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <ChakraProvider theme={theme}>
        <DeckListContextProvider>
          <Component {...pageProps} />
        </DeckListContextProvider>
      </ChakraProvider>
    </FirebaseProvider>
  );
}
export default MyApp;
