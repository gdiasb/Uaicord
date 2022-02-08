import Home from "./home";
import Head from "next/head";

export default function App() {
  return (
    <>
      <Head>
        <title>Uaicord Chat</title>
        <meta property="og:title" content="Uaicord Chat" key="title" />
      </Head>
      <Home />
    </>
  );
}
