import { css } from 'styled-components';
import { COLORS } from './palettes';

export const theme = css`
  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  body[data-theme="light"] {
    // landingPage
    --bg-main: ${COLORS.WHITE_FF};
    --bg-second: ${COLORS.VIOLET_F1};
    --bg-third: ${COLORS.VIOLET_F1};
    --bg-fourth: ${COLORS.VIOLET_15};
    --bg-footer: ${COLORS.BLACK_17};

    --text-main: ${COLORS.BLACK_00};
    --text-second: ${COLORS.BLACK_33};
    --text-third: ${COLORS.BLACK_17};
  }

  body[data-theme="dark"] {
    // landingPage
    --bg-main: ${COLORS.BLACK_00};
    --bg-second: ${COLORS.BLACK_17};
    --bg-third: ${COLORS.BLACK_4B};
    --bg-fourth: ${COLORS.BLACK_17};
    --bg-footer: ${COLORS.BLACK_00};

    --text-main: ${COLORS.WHITE_FF};
    --text-second: ${COLORS.GRAY_9F};;
    --text-third: ${COLORS.WHITE_FF};
  }

`;
