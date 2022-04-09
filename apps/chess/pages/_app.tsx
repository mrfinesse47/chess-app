import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyles, Navbar } from "@chess/features";
const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Chess K&S`}</title>
      </Head>
      <GlobalStyles />
      <Navbar />
      <main className="app">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default CustomApp;
