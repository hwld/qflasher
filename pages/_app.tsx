import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { PageTemplate } from "../components/PageTemplate";
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
      <ChakraProvider theme={theme}>
        <AppStateContextProvider>
          <PageTemplate>
            <Component {...pageProps} />
          </PageTemplate>
        </AppStateContextProvider>
      </ChakraProvider>
    </NoSSR>
  );
}
export default MyApp;
