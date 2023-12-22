import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { ButtonOnClickProps } from '@/types/button';
import styled, { css } from 'styled-components';
import addBoxWhite from '@/public/assets/icons/AddBoxWhite.svg';
import Image from 'next/image';

interface ButtonProps extends ButtonOnClickProps {
  text: string;
}

function InviteButton({ text, onClick }: ButtonProps) {
  return (
    <StyledButton onClick={onClick}>
      <Image src={addBoxWhite} alt="초대하기" />
      {text}
    </StyledButton>
  );
}

export default InviteButton;

const StyledButton = styled.button`
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
    position: absolute;
    right: 0;
    top: 44px;
  }
`;
