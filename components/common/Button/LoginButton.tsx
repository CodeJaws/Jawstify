import styled from 'styled-components'

interface ButtonProps {
  active: boolean
  size: string
}

function LoginButton({ active, size }: ButtonProps) {
  return (
    <>
      <StyledButton disabled={active ? false : true} $active={active} $size={size}>
        로그인
      </StyledButton>
    </>
  )
}

export default LoginButton

const StyledButton = styled.button<{ $active: boolean; $size: string }>`
  border: none;
  cursor: pointer;
  display: flex;
  width: ${({ $size }) => ($size === 'large' ? '520px' : '351px')};
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? '#5534da' : '#9FA6B2')};
  color: white;
  border-radius: 8px;
  color: var(--white, #fff);
  font-size: 18px;
  font-weight: 500;
`
