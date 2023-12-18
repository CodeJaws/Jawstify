import styled from 'styled-components'

function DeleteButton() {
  return (
    <>
      <StyledButton>삭제</StyledButton>
    </>
  )
}

export default DeleteButton

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  width: '84px';
  height: '32px';
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #5534da;
  font-size: 1.4rem;
  font-weight: 500;

  @media (width) {
    width: 52px;
    height: 28px;
    font-size: 1.2rem;
  }
`
