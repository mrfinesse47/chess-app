import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Chess K&S`}</title>
      </Head>
      <main className="app">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default CustomApp;
