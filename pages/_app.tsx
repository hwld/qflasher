import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { AppTemplate } from "../components/pages/common/AppTemplate";
import { AppStateContextProvider } from "../context/AppStateContextProvider";
import { theme } from "../theme/theme";

// SSRを使用せずにstatic html exportを使用するので、next devでSSRされないようにする
const NoSSR: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSSR>
      <Head>
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <AppStateContextProvider>
          <AppTemplate>
            <Component {...pageProps} />
          </AppTemplate>
        </AppStateContextProvider>
      </ChakraProvider>
    </NoSSR>
  );
}
export default MyApp;
