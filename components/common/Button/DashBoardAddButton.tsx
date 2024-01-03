import plus from '@/public/assets/icons/plus.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { ButtonOnClickProps } from '@/types/button';
import Image from 'next/image';
import styled from 'styled-components';

function DashBoardAddButton({ onClick }: ButtonOnClickProps) {
  return (
    <>
      <StyledButton onClick={onClick}>
        새로운 대시보드 <StyledPlusImage src={plus} alt="plus이미지" />
      </StyledButton>
    </>
  );
}

export default DashBoardAddButton;

const StyledButton = styled.button`
  width: 332px;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: var(--dashboardButton-border);
  background: var(--dashboardButton-bg);
  color: var(--dashboardButton-color);
  ${fontStyle(16, 600)};

  ${onTablet} {
    width: 247px;
    height: 68px;
  }
  ${onMobile} {
    font-size: 14px;
    width: 260px;
    height: 58px;
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
