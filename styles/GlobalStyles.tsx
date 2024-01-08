import { reset } from '@/styles/reset';
import { theme } from '@/styles/theme';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${theme}
`;

export default GlobalStyles;
