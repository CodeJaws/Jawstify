import { onMobile } from '@/styles/mediaQuery';
import { ReactNode } from 'react';
import { COLORS } from '@/styles/palettes';
import { ButtonOnClickProps } from '@/types/button';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonOnClickProps {
  text: string;
  isViolet?: boolean;
  size: 'large' | 'small';
  children?: ReactNode;
  className: string;
}

function Button({ text, isViolet = false, size, children, className, onClick }: ButtonProps) {
  return (
    <>
      <StyledButton $isViolet={isViolet} $size={size} className={className} onClick={onClick}>
        {text}
        {children}
      </StyledButton>
    </>
  );
}

export default Button;

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
  ${onMobile} {
    width: 52px;
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
