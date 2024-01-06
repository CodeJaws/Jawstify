import plus from '@/public/assets/icons/plus.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { ButtonOnClickProps } from '@/types/button';

import Image from 'next/image';
import styled from 'styled-components';

function ColumnAddButton({ onClick }: ButtonOnClickProps) {
  return (
    <>
      <StyledButton onClick={onClick}>
        새로운 컬럼 추가하기
        <StyledPlusImage src={plus} alt="plus이미지" />
      </StyledButton>
    </>
  );
}

export default ColumnAddButton;

const StyledButton = styled.button`
  width: 354px;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: var(--button-border);
  background: var(--button-bg);
  color: var(--button-color);
  ${fontStyle(18, 700)};

  ${onTablet} {
    width: 544px;
    height: 70px;
  }
  ${onMobile} {
    width: 284px;
    height: 60px;
    font-size: 1.6rem;
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
