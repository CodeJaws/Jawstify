import leftPage from '@/public/assets/icons/leftPage.svg';
import rightPage from '@/public/assets/icons/rightPage.svg';
import lightLeftPage from '@/public/assets/icons/lightLeftPage.svg';
import lightRightPage from '@/public/assets/icons/lightRightPage.svg';
import Image from 'next/image';
import styled from 'styled-components';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

interface PagenationButtonProps {
  active: boolean;
}

function PaginationButton({ active }: PagenationButtonProps) {
  return (
    <StyledDiv>
      <StyledPageButton $direction={'left'} disabled={active}>
        <StyledPageImage src={active ? leftPage : lightLeftPage} alt="왼쪽화살표" />
      </StyledPageButton>
      <StyledPageButton $direction={'right'}>
        <StyledPageImage src={active ? rightPage : lightRightPage} alt="오른쪽화살표" />
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
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};

  ${onMobile} {
    width: 36px;
    height: 36px;
  }
`;

const StyledPageImage = styled(Image)`
  width: 16px;
  height: 16px;
`;
