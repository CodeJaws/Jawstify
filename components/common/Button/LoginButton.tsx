import styled, { css } from 'styled-components';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

interface LoginButtonProps {
  active: boolean;
  type: 'login' | 'landing';
}

function LoginButton({ active, type }: LoginButtonProps) {
  return (
    <>
      <StyledButton $type={type} disabled={active ? false : true} $active={active}>
        로그인
      </StyledButton>
    </>
  );
}

export default LoginButton;

const StyledButton = styled.button<{ $active: boolean; $type: string }>`
  width: 520px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? COLORS.VIOLET_55 : COLORS.GRAY_9F)};
  color: ${COLORS.WHITE_FF};
  border-radius: 8px;
  ${fontStyle(18, 500)};
  ${onMobile} {
    width: 351px;
  }

  ${({ $type }) =>
    $type === 'landing' &&
    css`
      width: 280px;
      height: 50px;
      ${fontStyle(18, 500)};
      ${onTablet} {
        font-size: 1.6rem;
      }
      ${onMobile} {
        font-size: 1.4rem;
        width: 235px;
        height: 42px;
      }
    `}
`;
