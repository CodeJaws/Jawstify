import styled from 'styled-components';
import { COLORS } from '@/styles/palettes';
import { onMobile } from '@/styles/mediaQuery';

interface ButtonProps {
  text: string;
  isViolet: boolean;
  size: string;
}

function Button({ text, isViolet, size }: ButtonProps) {
  return (
    <>
      <StyledButton $isViolet={isViolet} $size={size}>
        {text}
      </StyledButton>
    </>
  );
}

export default Button;

const StyledButton = styled.button<{ $isViolet: boolean; $size: string }>`
  width: ${({ $size }) => ($size === 'large' ? '120px' : '84px')};
  height: ${({ $size }) => ($size === 'large' ? '48px' : '32px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${({ $isViolet }) => ($isViolet ? `${COLORS.VIOLET_55}` : `${COLORS.WHITE_FF}`)};
  color: ${({ $isViolet }) => ($isViolet ? `${COLORS.WHITE_FF}` : `${COLORS.VIOLET_55}`)};
  font-weight: 500;
  font-size: ${({ $size }) => ($size === 'large' ? '1.6rem' : '1.4rem')};

  ${onMobile} {
    width: ${({ $size }) => ($size === 'large' ? '138px' : '52px')};
    height: ${({ $size }) => ($size === 'large' ? '42px' : '28px')};
    font-size: ${({ $size }) => ($size === 'large' ? '1.4rem' : '1.2rem')};
  }
`;
