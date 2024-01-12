import { COLORS } from '@/styles/palettes';
import { css } from 'styled-components';

export const theme = css`
  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: color 0.2s ease-in;
  }

  body[data-theme='light'] {
    // landingPage
    --bg-main: ${COLORS.GRAY_FA};
    --bg-second: ${COLORS.VIOLET_F1};
    --bg-third: ${COLORS.VIOLET_F1};
    --bg-fourth: ${COLORS.VIOLET_15};
    --bg-footer: ${COLORS.BLACK_17};
    --text-main: ${COLORS.BLACK_00};
    --text-second: ${COLORS.BLACK_33};
    --text-third: ${COLORS.BLACK_17};

    // nav
    --nav-bg: ${COLORS.WHITE_FF};
    --nav-border: 1px solid ${COLORS.GRAY_D9};
    --nav-imgBorder: 2px solid ${COLORS.WHITE_FF};
    --nav-Dropdown-bg: ${COLORS.WHITE_FF};
    --nav-Dropdown-border: 1px solid ${COLORS.GRAY_D9};
    --nav-Dropdown-hover: ${COLORS.VIOLET_F1};
    --nav-Dropdown-color: ${COLORS.BLACK_17};

    // sidebar
    --sidebar-border: 1px solid ${COLORS.GRAY_D9};
    --sidebar-bg: ${COLORS.WHITE_FF};
    --sidebar-hover: ${COLORS.VIOLET_F1};
    
    // content
    --content-color: ${COLORS.WHITE_FF};
    --content-back: ${COLORS.GRAY_FA};
    --content-border: 1px solid transparent;
    --content-divider: 1px solid ${COLORS.GRAY_EE};
    --content-main: ${COLORS.BLACK_33};
    --content-second: ${COLORS.GRAY_9F};
    --invite-title: ${COLORS.BLACK_33};
    --columns-border-right: 0.0625rem solid ${COLORS.GRAY_D9};

    // input
    --input-label: ${COLORS.BLACK_33};
    --input-bg: ${COLORS.WHITE_FF};
    --input-border: ${COLORS.GRAY_D9};
    --input-color: ${COLORS.GRAY_9F};
    --input-color-tag: transparent;

    // signup, loginPage
    --sign-bg: ${COLORS.GRAY_FA};
    --sign-main: ${COLORS.GRAY_EE};

    // button
    --button-bg: ${COLORS.WHITE_FF};
    --button-color: ${COLORS.BLACK_33};
    --button-border: 1px solid ${COLORS.GRAY_D9};
    --button-hover: ${COLORS.VIOLET_F1};

    // modal
    --modal-bg: ${COLORS.WHITE_FF};
    --modal-border: 1px solid transparent;
    --modal-title: ${COLORS.BLACK_33};
  }

  body[data-theme='dark'] {
    // landingPage
    --bg-main: ${COLORS.BLACK_17};
    --bg-second: ${COLORS.BLACK_22};
    --bg-third: ${COLORS.BLACK_4B};
    --bg-fourth: ${COLORS.BLACK_22};
    --bg-footer: ${COLORS.BLACK_17};
    --text-main: ${COLORS.GRAY_EE};
    --text-second: ${COLORS.GRAY_9F};
    --text-third: ${COLORS.WHITE_FF};

    // nav
    --nav-bg: ${COLORS.BLACK_17};
    --nav-border: 1px solid ${COLORS.GRAY_55};
    --nav-imgBorder: 2px solid ${COLORS.GRAY_D9};
    --nav-Dropdown-bg: ${COLORS.BLACK_17};
    --nav-Dropdown-border: 0.5px solid ${COLORS.BLACK_4B};
    --nav-Dropdown-hover: ${COLORS.BLACK_33};
    --nav-Dropdown-color: ${COLORS.GRAY_9F};

    // sidebar
    --sidebar-border: 1px solid ${COLORS.GRAY_55};
    --sidebar-bg: ${COLORS.BLACK_17};
    --sidebar-hover: ${COLORS.BLACK_33};

    // content
    --content-color: ${COLORS.BLACK_22};
    --content-back: ${COLORS.BLACK_17};
    --content-border: 1px solid ${COLORS.BLACK_4B};
    --content-divider: 0.5px solid ${COLORS.BLACK_4B};
    --content-main: ${COLORS.GRAY_EE};
    --content-second: ${COLORS.GRAY_EE};
    --invite-title: ${COLORS.VIOLET_55};
    --columns-border-right: 0.0625rem solid ${COLORS.BLACK_4B};

    // input
    --input-label: ${COLORS.WHITE_FF};
    --input-bg: ${COLORS.BLACK_22};
    --input-border: ${COLORS.BLACK_4B};
    --input-color: ${COLORS.GRAY_9F};
    --input-color-tag: ${COLORS.BLACK_22};

    // signup, loginPage
    --sign-bg: ${COLORS.BLACK_17};
    --sign-main: ${COLORS.GRAY_EE};

    // button
    --button-bg: ${COLORS.BLACK_22};
    --button-color: ${COLORS.GRAY_D9};
    --button-border: 0.5px solid ${COLORS.BLACK_4B};
    --button-hover: ${COLORS.BLACK_33};

    // modal
    --modal-bg: ${COLORS.BLACK_17};
    --modal-title: ${COLORS.VIOLET_55};
    --modal-border: 1px solid ${COLORS.BLACK_4B}
  }
`;
