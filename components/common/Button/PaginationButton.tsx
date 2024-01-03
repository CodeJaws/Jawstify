import leftPage from '@/public/assets/icons/leftPage.svg';
import rightPage from '@/public/assets/icons/rightPage.svg';
import lightLeftPage from '@/public/assets/icons/lightLeftPage.svg';
import lightRightPage from '@/public/assets/icons/lightRightPage.svg';
import Image from 'next/image';
import styled from 'styled-components';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

interface PaginationButtonProps {
  active: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
}

const choosePaginationImage = ({ direction, active }: { direction: 'left' | 'right'; active: boolean }) => {
  if (active && direction === 'left') return leftPage;
  else if (active && direction === 'right') return rightPage;
  else if (!active && direction === 'left') return lightLeftPage;
  else if (!active && direction === 'right') return lightRightPage;
};

function PaginationButton({ active, direction, onClick }: PaginationButtonProps) {
  const selectedImg = choosePaginationImage({ direction, active });
  const imgAlt = direction === 'left' ? '왼쪽화살표' : '오른쪽화살표';

  return (
    <StyledDiv onClick={onClick}>
      <StyledPageButton $direction={direction}>
        <StyledPageImage src={selectedImg} alt={imgAlt} />
      </StyledPageButton>
    </StyledDiv>
  );
}

export default PaginationButton;

const StyledDiv = styled.div`
  display: flex;
`;

const StyledPageButton = styled.button<{ $direction: string }>`
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ $direction }) => ($direction === 'left' ? '4px 0 0 4px' : '0 4px 4px 0')};
  border: var(--dashboardButton-border);
  background: var(--dashboardButton-bg);

  ${onMobile} {
    width: 36px;
    height: 36px;
  }
`;

const StyledPageImage = styled(Image)`
  width: 16px;
  height: 16px;
`;
