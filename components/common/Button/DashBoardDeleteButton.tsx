import styled from 'styled-components'
import { onMobile } from '@/styles/mediaQuery'

function DashBoardDeleteButton() {
  return (
    <>
      <StyledButton>대시보드 삭제하기</StyledButton>
    </>
  )
}

export default DashBoardDeleteButton

const StyledButton = styled.button`
  box-sizing: border-box;
  display: flex;
  width: 320px;
  height: 62px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fafafa;
  color: #333236;
  font-size: 18px;
  font-weight: 500;

  ${onMobile} {
    font-size: 16px;
    width: 284px;
    height: 52px;
  }
`
