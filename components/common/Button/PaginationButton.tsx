import leftPage from '@/public/assets/icons/leftPage.svg';
import lightLeftPage from '@/public/assets/icons/lightLeftPage.svg';
import lightRightPage from '@/public/assets/icons/lightRightPage.svg';
import rightPage from '@/public/assets/icons/rightPage.svg';
import { onMobile } from '@/styles/mediaQuery';
import { localStorageGetItem } from '@/utils/localStorage';

import Image from 'next/image';
import styled from 'styled-components';

interface PaginationButtonProps {
  active: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
}

const choosePaginationImage = ({
  direction,
  active,
  themeMode,
}: {
  direction: 'left' | 'right';
  active: boolean;
  themeMode: string;
}) => {
  if (themeMode == 'light') {
    if (active && direction === 'left') return leftPage;
    else if (active && direction === 'right') return rightPage;
    else if (!active && direction === 'left') return lightLeftPage;
    else if (!active && direction === 'right') return lightRightPage;
  } else {
    if (active && direction === 'left') return lightLeftPage;
    else if (active && direction === 'right') return lightRightPage;
    else if (!active && direction === 'left') return leftPage;
    else if (!active && direction === 'right') return rightPage;
  }
};

function PaginationButton({ active, direction, onClick }: PaginationButtonProps) {
  const themeMode = localStorageGetItem('theme') as string;
  const selectedImg = choosePaginationImage({ direction, active, themeMode });
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
  border: var(--button-border);
  background: var(--button-bg);

  ${onMobile} {
    width: 36px;
    height: 36px;
  }
`;

const StyledPageImage = styled(Image)`
  width: 16px;
  height: 16px;
`;
