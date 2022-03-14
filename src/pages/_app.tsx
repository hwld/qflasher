import { AppTemplate } from "@/components/ui/AppTemplate";
import { AppStateProvider } from "@/context/AppStateContext";
import { theme } from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../theme/scrollbar.css";

// SSRを使用せずにstatic html exportを使用するので、next devでSSRされないようにする
const NoSSR: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const getProvider = Component.getProvider || ((page: unknown) => page);

  return (
    <NoSSR>
      <Head>
        {/* documentに書かない理由  */}
        {/* https://nextjs.org/docs/messages/no-document-title */}
        {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
        <title>Qflasher</title>
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <AppStateProvider>
          {/* ちらつきを防ぐために全画面でヘッダーを共有したかったのでAppTemplateはここに書いた */}
          <AppTemplate>{getProvider(<Component {...pageProps} />)}</AppTemplate>
        </AppStateProvider>
      </ChakraProvider>
    </NoSSR>
  );
}
export default MyApp;
