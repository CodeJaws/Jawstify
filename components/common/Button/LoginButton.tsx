import styled, { css } from 'styled-components';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import { ButtonOnClickProps } from '@/types/button';

interface LoginButtonProps extends ButtonOnClickProps {
  active?: boolean;
  usingType: 'login' | 'landing';
  text: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  margin?: string;
}

function LoginButton({ active = false, usingType, onClick, text, type = 'button', margin = '0px' }: LoginButtonProps) {
  return (
    <>
      <StyledButton
        $type={usingType}
        type={type}
        disabled={active ? false : true}
        $active={active}
        $margin={margin}
        onClick={onClick}
      >
        {text}
      </StyledButton>
    </>
  );
}

export default LoginButton;

const StyledButton = styled.button<{ $active: boolean; $type: string; $margin: string }>`
  width: 520px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: ${({ $margin }) => $margin};
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
