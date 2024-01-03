import { css } from 'styled-components';
import { COLORS } from './palettes';

export const theme = css`
  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  body[data-theme='light'] {
    // landingPage
    --bg-main: ${COLORS.WHITE_FF};
    --bg-second: ${COLORS.VIOLET_F1};
    --bg-third: ${COLORS.VIOLET_F1};
    --bg-fourth: ${COLORS.VIOLET_15};
    --bg-footer: ${COLORS.BLACK_17};

    --text-main: ${COLORS.BLACK_00};
    --text-second: ${COLORS.BLACK_33};
    --text-third: ${COLORS.BLACK_17};


    --nav-bg: ${COLORS.WHITE_FF};
    --nav-border: 1px solid #d9d9d9;
    --nav-imgBorder: 2px solid #ffffff;
    --nav-Dropdown-bg: #ffffff;
    --nav-Dropdown-border: 1px solid #444444;
    --nav-Dropdown-hover: #F1EFFD;
    --nav-Dropdown-color: #787486;

    --sidebar-border: 1px solid #d9d9d9;
    --sidebar-bg: #ffffff;
    --sidebar-hover: #F1EFFD;

    --content-color: #ffffff;
    --content-back: #fafafa;
    --content-border: 1px solid transparent;
    --content-divider: 1px solid #eeeeee;
    --content-main: #333236;
    --content-second: #9FA6B2;

    --input-label: #333326;
    --input-bg: #ffffff;
    --input-border: #d9d9d9;
    --input-color: #9fa6b2;

    --sign-bg: #fafafa;
    --sign-main: #eeeeee;

    --button-bg: #ffffff;
    --button-color: #333236;
    --button-border: 1px solid #d9d9d9;
    
    --modal-bg: #ffffff;
    --modal-title: #333236;
  
    --invite-title: #333246;

  }

  body[data-theme='dark'] {
    // landingPage
    --bg-main: #111111;
    --bg-second: ${COLORS.BLACK_17};
    --bg-third: ${COLORS.BLACK_4B};
    --bg-fourth: ${COLORS.BLACK_17};
    --bg-footer: #111111;

    --text-main: #eeeeee;
    --text-second: ${COLORS.GRAY_9F};;
    --text-third: ${COLORS.WHITE_FF};


    --nav-bg : #191919;
    --nav-border: 1px solid #555555;
    --nav-imgBorder: 2px solid #d9d9d9;
    --nav-Dropdown-bg: #171717;
    --nav-Dropdown-border: 0.5px solid #444444;
    --nav-Dropdown-hover: #303134;
    --nav-Dropdown-color: #787486;

    --sidebar-border: 1px solid #555555;
    --sidebar-bg: #191919;
    --sidebar-hover: #303134;

    --content-color: #28282b;
    --content-back: #111111;
    --content-border: 1px solid #444444;
    --content-divider: 0.5px solid #444444;
    --content-main: #eeeeee;
    --content-second: #eeeeee;

    --input-label: #ffffff;
    --input-bg: #171717;
    --input-border: #444444;
    --input-color: #9fa6b2;

    --sign-bg: #111111;
    --sign-main: #eeeeee;

    --button-bg: #222222;
    --button-color: #dddddd;
    --button-border: 0.5px solid #444444;

    --modal-bg: #171717;
    --modal-title: #5534DA;

    --invite-title: #5534da;
  }

`;
