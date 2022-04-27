import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { AppStateProvider } from "@/context/AppStateContext";
import { theme } from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactElement } from "react";
import "../theme/scrollbar.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// SSRを使用せずにstatic html exportを使用するので、next devでSSRされないようにする
const NoSSR: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <ErrorBoundary>
      <NoSSR>
        <Head>
          {/* documentに書かない理由  */}
          {/* https://nextjs.org/docs/messages/no-document-title */}
          {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
          <title>Qflasher</title>
          <meta
            name="viewport"
            content="initial-scale=1.0,width=device-width"
          />
        </Head>
        <ChakraProvider theme={theme}>
          <AppStateProvider>
            {getLayout(<Component {...pageProps} />)}
          </AppStateProvider>
        </ChakraProvider>
      </NoSSR>
    </ErrorBoundary>
  );
}
export default MyApp;
