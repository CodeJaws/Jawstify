import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { ButtonOnClickProps } from '@/types/button';

import styled from 'styled-components';

function DeleteButton({ onClick }: ButtonOnClickProps) {
  return (
    <>
      <StyledButton onClick={onClick}>대시보드 삭제하기</StyledButton>
    </>
  );
}

export default DeleteButton;

const StyledButton = styled.button`
  width: 320px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.GRAY_FA};
  color: ${COLORS.BLACK_33};
  ${fontStyle(18, 500)};

  ${onMobile} {
    width: 284px;
    height: 52px;
    font-size: 1.6rem;
  }
`;
