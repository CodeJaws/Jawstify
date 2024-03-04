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

  if (isLightTheme) {
    if (active && direction === 'left') return '/assets/icons/leftPage.svg';
    if (active && direction === 'right') return '/assets/icons/rightPage.svg';
    if (!active && direction === 'left') return '/assets/icons/lightLeftPage.svg';
    if (!active && direction === 'right') return '/assets/icons/lightRightPage.svg';
  } else {
    if (active && direction === 'left') return '/assets/icons/lightLeftPage.svg';
    if (active && direction === 'right') return '/assets/icons/lightRightPage.svg';
    if (!active && direction === 'left') return '/assets/icons/leftPage.svg';
    if (!active && direction === 'right') return '/assets/icons/rightPage.svg';
  }

  return '';
};

function PaginationButton({ active, direction, onClick }: PaginationButtonProps) {
  const themeMode = localStorageGetItem('theme') as string;
  const imgSrc = determineImageSource({ direction, active, themeMode });
  const imgAlt = direction === 'left' ? '왼쪽화살표' : '오른쪽화살표';

  return (
    <StyledPageButton $direction={direction} onClick={onClick}>
      <Image src={imgSrc} alt={imgAlt} width={16} height={16} priority />
    </StyledPageButton>
  );
}

export default PaginationButton;

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
