import { onMobile } from '@/styles/mediaQuery';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface ChipProps {
  text: string;
  color: string;
  backgroundColor: string;
  children?: ReactNode;
  margin?: string;
}

function ContentChip({ text, color, backgroundColor, children, margin = '0 6px 0 0' }: ChipProps) {
  return (
    <StyledContainer $color={color} $background={backgroundColor} $margin={margin}>
      {text}
      {children}
    </StyledContainer>
  );
}

export default ContentChip;

const StyledContainer = styled.div<{ $color: string; $background: string; $margin: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  margin: ${({ $margin }) => $margin};
  font-size: 1.2rem;
  color: ${({ $color }) => $color};
  background-color: ${({ $background }) => $background};

  ${onMobile} {
    font-size: 1rem;
  }
`;
