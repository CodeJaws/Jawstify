import { css } from 'styled-components';

export const reset = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('@/fonts/Montserrat-Bold.ttf') format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Pretendard';
    word-break: keep-all;
  }

  html,
  body {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
  }

  body {
    -ms-overflow-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input {
    border: none;
    padding: none;
  }

  input:focus {
    outline: none;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }
`;
