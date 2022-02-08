import GlobalStyle from "../styles/GlobalStyle";
import Head from "next/head";

export default function Uaicord({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Uaicord Chat</title>
        <meta property="og:title" content="Uaicord Chat" key="title" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
