import Image from 'next/image';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

interface ButtonProps {
  imageUrl: string;
  children: ReactNode;
  altText: string;
}

function Button({ imageUrl, children, altText }: ButtonProps) {
  return (
    <StyledButton>
      <StyledImage src={imageUrl} alt={altText} />
      <p>{children}</p>
    </StyledButton>
  );
}

export default Button;

const StyledImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

const StyledButton = styled.button`
  width: max-content;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};

  p {
    color: ${COLORS.GRAY_78};

    ${onPc} {
      ${fontStyle(16, 500)}
    }

    ${onTablet} {
      text-align: center;
      ${fontStyle(14, 500)}
    }

    ${onMobile} {
      text-align: center;
      ${fontStyle(14, 500)}
    }
  }

  &:hover {
    transform: scale(1.05);
  }

  ${onPc} {
    height: 40px;
  }

  ${onTablet} {
    height: 36px;
  }

  ${onMobile} {
    height: 30px;
    padding: 0 12px;
    ${StyledImage} {
      display: none;
    }
  }
`;
