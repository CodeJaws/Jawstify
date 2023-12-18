import leftArrow from '@/public/assets/icons/leftArrow.svg'
import rightArrow from '@/public/assets/icons/rightArrow.svg'
import Image from 'next/image'
import styled from 'styled-components'
import { onMobile } from '@/styles/mediaQuery'

function LeftRightButton() {
  return (
    <Div>
      <StyledArrowButton $direction={'left'} disabled>
        <ArrowImage src={leftArrow} alt="왼쪽화살표" />
      </StyledArrowButton>
      <StyledArrowButton $direction={'right'} disabled>
        <ArrowImage src={rightArrow} alt="오른쪽화살표" />
      </StyledArrowButton>
    </Div>
  )
}

export default LeftRightButton

const Div = styled.div`
  display: flex;
`

const StyledArrowButton = styled.button<{ $direction: string }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ $direction }) => ($direction === 'left' ? '4px 0 0 4px' : '0 4px 4px 0')};
  border: 1px solid #d9d9d9;
  background: #fff;

  ${onMobile} {
    width: 36px;
    height: 36px;
  }
`

const ArrowImage = styled(Image)`
  width: 16px;
  height: 16px;
`
