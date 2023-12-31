import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${theme}
`;

export default GlobalStyles;
