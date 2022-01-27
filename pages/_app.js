import GlobalStyle from "../styles/GlobalStyle";

export default function Uaicord({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
