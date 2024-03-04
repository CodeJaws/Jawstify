import Image from 'next/image';
import styled from 'styled-components';

import { onMobile } from '@/styles/mediaQuery';
import { localStorageGetItem } from '@/utils/localStorage';

interface PaginationButtonProps {
  active: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
}

const determineImageSource = ({
  direction,
  active,
  themeMode,
}: {
  direction: 'left' | 'right';
  active: boolean;
  themeMode: string;
}) => {
  const isLightTheme = themeMode === 'light';
  const isActiveLeft = active && direction === 'left';
  const isActiveRight = active && direction === 'right';

  if (isLightTheme) {
    if (isActiveLeft) return '/assets/icons/leftPage.svg';
    else if (isActiveRight) return '/assets/icons/rightPage.svg';
    else if (!active && direction === 'left') return '/assets/icons/lightLeftPage.svg';
    else if (!active && direction === 'right') return '/assets/icons/lightRightPage.svg';
  } else {
    if (isActiveLeft) return '/assets/icons/lightLeftPage.svg';
    else if (isActiveRight) return '/assets/icons/lightRightPage.svg';
    else if (!active && direction === 'left') return '/assets/icons/leftPage.svg';
    else if (!active && direction === 'right') return '/assets/icons/rightPage.svg';
  }

  return '';
};

function PaginationButton({ active, direction, onClick }: PaginationButtonProps) {
  const themeMode = localStorageGetItem('theme') as string;
  const imgSrc = determineImageSource({ direction, active, themeMode });
  const imgAlt = direction === 'left' ? '왼쪽화살표' : '오른쪽화살표';

  return (
    <StyledDiv onClick={onClick}>
      <StyledPageButton $direction={direction}>
        <StyledPageImage src={imgSrc} alt={imgAlt} width={40} height={40} priority />
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
