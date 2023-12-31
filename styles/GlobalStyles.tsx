import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  body[data-theme="light"] {
    // landingPage
    --bg-main: #FFFFFF;
    --bg-second: #F1EFFD;
    --bg-third: #F1EFFD;
    --bg-fourth: #1501cb9c;
    --bg-footer: #171717;

    --text-main: #000000;
    --text-second: #333236;
    --text-third: #171717;
  }

  body[data-theme="dark"] {
    // landingPage
    --bg-main: #000000;
    --bg-second: #171717;
    --bg-third: #4B4B4B;
    --bg-fourth: #171717;
    --bg-footer: #000000;

    --text-main: #FFFFFF;
    --text-second: #9FA6B2;
    --text-third: #FFFFFF;
  }
`;

export default GlobalStyles;
