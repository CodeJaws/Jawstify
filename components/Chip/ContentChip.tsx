import { onMobile } from '@/styles/mediaQuery';

import styled from 'styled-components';

interface ChipProps {
  text: string;
  color: string;
  backgroundColor: string;
}

function ContentChip({ text, color, backgroundColor }: ChipProps) {
  return (
    <StyledContainer $color={color} $background={backgroundColor}>
      {text}
    </StyledContainer>
  );
}

export default ContentChip;

const StyledContainer = styled.div<{ $color: string; $background: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  /* margin-left: 6px; */
  font-size: 1.2rem;
  color: ${({ $color }) => $color};
  background-color: ${({ $background }) => $background};

  ${onMobile} {
    font-size: 1rem;
  }
`;
