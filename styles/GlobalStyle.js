function GlobalStyle() {
  return (
    <style global jsx>{`
      @import url('http://fonts.cdnfonts.com/css/jaman-edan');

      @font-face {
        font-family: 'Jaman-Edan',
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