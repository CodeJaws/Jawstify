import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    background-color: var(--bg-main);
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  body[data-theme="light"] {

    // background(landingPage)
    --bg-main: #FFFFFF;
  }

  body[data-theme="dark"] {

    // main(landingPage)
    --bg-main: #000000;
  }
`;

export default GlobalStyles;
