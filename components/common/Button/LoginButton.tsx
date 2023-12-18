import styled from 'styled-components'

interface ButtonProps {
  active: boolean
}

function LoginButton({ active }: ButtonProps) {
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
  border: none;
  cursor: pointer;
  display: flex;
  width: '520px';
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

  @media (width) {
    width: '351px';
  }
`
