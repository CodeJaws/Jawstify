import Image from 'next/image'
import styled from 'styled-components'
import { onTablet, onMobile } from '@/styles/mediaQuery'
import plusImage from '@/public/assets/icons/plusImage.svg'

function PlusButton() {
  return (
    <>
      <StyledButton>
        <PlusImage src={plusImage} alt="Plus이미지" />
      </StyledButton>
    </>
  )
}

export default PlusButton

const StyledButton = styled.button`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 314px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  background: #fff;
  ${onTablet} {
    width: 544px;
  }
  ${onMobile} {
    width: 284px;
    height: 32px;
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
