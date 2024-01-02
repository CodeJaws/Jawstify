import Image from 'next/image';
import styled from 'styled-components';

import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import addBoxWhite from '@/public/assets/icons/AddBoxWhite.svg';
import { ButtonOnClickProps } from '@/types/button';

interface ButtonProps extends ButtonOnClickProps {
  text: string;
  hasItems: boolean;
}

function InviteButton({ text, onClick, hasItems }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} $hasItems={hasItems}>
      <Image src={addBoxWhite} alt="초대하기" />
      {text}
    </StyledButton>
  );
}

export default InviteButton;

const StyledButton = styled.button<{ $hasItems: boolean }>`
  width: 105px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${COLORS.VIOLET_55};

  color: ${COLORS.WHITE_FF};
  font-weight: 500;
  font-size: 1.4rem;
  font-size: 1.4rem;

  ${onMobile} {
    width: 86px;
    height: 28px;
    font-size: 1.2rem;
  }
  ${onMobile} {
    ${({ $hasItems }) => $hasItems && 'position: absolute;'}

    right: 0;
    top: 44px;
  }
`;
