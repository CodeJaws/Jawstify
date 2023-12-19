import styled from 'styled-components'
import { onMobile } from '@/styles/mediaQuery'
import { fontStyle } from '@/styles/fontStyle'
import { COLORS } from '@/styles/palettes'

function DeleteButton() {
  return (
    <>
      <StyledButton>대시보드 삭제하기</StyledButton>
    </>
  )
}

export default DeleteButton

const StyledButton = styled.button`
  width: 320px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid ${COLORS.GRAY_30};
  background: ${COLORS.GRAY_10};
  color: #${COLORS.BLACK_200};
  ${fontStyle(18, 500)};

  ${onMobile} {
    width: 284px;
    height: 52px;
    font-size: 1.6rem;
  }
`
