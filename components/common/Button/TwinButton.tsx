import styled from 'styled-components';
import { COLORS } from '@/styles/palettes';
import { onMobile, onTablet } from '@/styles/mediaQuery';

interface TwinButtonProps {
  text1: string;
  text2: string;
  isViolet: boolean;
  size: string;
}

function TwinButton({ text1, text2, isViolet, size }: TwinButtonProps) {
  return (
    <StyledDiv>
      <StyledButton $isViolet={isViolet} $size={size}>
        {text1}
      </StyledButton>
      <StyledButton $isViolet={!isViolet} $size={size}>
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

  ${onTablet} {
    width: ${({ $size }) => ($size === 'small' ? '72px' : '')};
    height: ${({ $size }) => ($size === 'small' ? '30px' : '')};
  }

  ${onMobile} {
    width: ${({ $size }) => ($size === 'large' ? '138px' : '109px')};
    height: ${({ $size }) => ($size === 'large' ? '42px' : '28px')};
    font-size: ${({ $size }) => ($size === 'large' ? '1.4rem' : '1.2rem')};
  }
`;
