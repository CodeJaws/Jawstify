import plus from '@/public/assets/icons/plus.svg';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { ButtonOnClickProps } from '@/types/button';

import Image from 'next/image';
import styled from 'styled-components';

function AddButton({ onClick }: ButtonOnClickProps) {
  return (
    <StyledButton onClick={onClick}>
      <StyledPlusImage src={plus} alt="Plus이미지" />
    </StyledButton>
  );
}

export default AddButton;

const StyledButton = styled.button`
  width: 314px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: var(--button-border);
  background: var(--button-bg);

  ${onTablet} {
    width: 544px;
  }
  ${onMobile} {
    width: 284px;
    height: 32px;
  }
`;

const StyledPlusImage = styled(Image)`
  width: 16px;
  height: 16px;

  ${onMobile} {
    width: 14.5px;
    height: 14.5px;
  }
`;
