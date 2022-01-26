function GlobalStyle() {
  return (
    <style global jsx>{`

      @font-face {
        font-family: 'Jaman Edan';
        font-style: normal;
        font-weight: 400;
        src: local('Jaman Edan'), url('https://fonts.cdnfonts.com/s/74233/JamanEdanPersonal-ALla2.woff') format('woff');
    }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

export default GlobalStyle;
