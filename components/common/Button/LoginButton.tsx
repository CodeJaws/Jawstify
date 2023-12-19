import styled from 'styled-components'
import { onMobile } from '@/styles/mediaQuery'
import { fontStyle } from '@/styles/fontStyle'
import { COLORS } from '@/styles/palettes'

interface LoginButtonProps {
  active: boolean
}

function LoginButton({ active }: LoginButtonProps) {
  return (
    <>
      <StyledButton disabled={active ? false : true} $active={active}>
        로그인
      </StyledButton>
    </>
  )
}

export default LoginButton

const StyledButton = styled.button<{ $active: boolean }>`
  width: 520px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? COLORS.VIOLET : COLORS.GRAY_40)};
  color: ${COLORS.WHITE};
  border-radius: 8px;
  ${fontStyle(18, 500)};

  ${onMobile} {
    width: 351px;
  }
`
