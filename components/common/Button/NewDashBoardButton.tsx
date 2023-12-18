import Image from 'next/image'
import styled from 'styled-components'
import { onTablet, onMobile } from '@/styles/mediaQuery'
import plusImage from '@/public/assets/icons/plusImage.svg'

function NewDashBoardButton() {
  return (
    <>
      <StyledButton>
        새로운 대시보드 <PlusImage src={plusImage} alt="plus이미지" />
      </StyledButton>
    </>
  )
}

export default NewDashBoardButton

const StyledButton = styled.button`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 332px;
  height: 70px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #333236;
  font-size: 16px;
  font-weight: 600;

  ${onTablet} {
    width: 247px;
    height: 68px;
  }
  ${onMobile} {
    font-size: 14px;
    width: 260px;
    height: 58px;
  }
`

const PlusImage = styled(Image)`
  width: 16px;
  height: 16px;

  ${onMobile} {
    width: 14.5px;
    height: 14.5px;
  }
`
