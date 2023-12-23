import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { MouseEvent, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface TwinButtonProps {
  text1: string;
  text2: string;
  isViolet?: boolean;
  size: 'large' | 'small';
  children?: ReactNode;
  className: string;
  onLeftClick: (e: MouseEvent<HTMLElement>) => void;
  onRightClick: (e: MouseEvent<HTMLElement>) => void;
}

function TwinButton({
  text1,
  text2,
  isViolet = false,
  size,
  children,
  className,
  onLeftClick,
  onRightClick,
}: TwinButtonProps) {
  return (
    <StyledDiv className={className}>
      {children}
      <StyledButton $isViolet={isViolet} $size={size} onClick={onLeftClick}>
        {text1}
      </StyledButton>
      <StyledButton $isViolet={!isViolet} $size={size} onClick={onRightClick}>
        {text2}
      </StyledButton>
    </StyledDiv>
  );
}

export default TwinButton;

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button<{ $isViolet: boolean; $size: string }>`
  width: 84px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${({ $isViolet }) => ($isViolet ? `${COLORS.VIOLET_55}` : `${COLORS.WHITE_FF}`)};
  color: ${({ $isViolet }) => ($isViolet ? `${COLORS.WHITE_FF}` : `${COLORS.VIOLET_55}`)};
  font-weight: 500;
  font-size: 1.4rem;
  ${onTablet} {
    width: ${({ $size }) => ($size === 'small' ? '72px' : '')};
    height: ${({ $size }) => ($size === 'small' ? '30px' : '')};
  }

  ${onMobile} {
    width: 109px;
    height: 28px;
    font-size: 1.2rem;
  }

  ${({ $size }) =>
    $size === 'large' &&
    css`
      width: 120px;
      height: 48px;
      font-size: 1.6rem;

      ${onMobile} {
        width: 138px;
        height: 42px;
        font-size: 1.4rem;
      }
    `}
`;
