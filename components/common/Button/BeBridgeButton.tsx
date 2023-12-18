import styled from 'styled-components'
import greenCircle from '@/public/assets/icons/greenCircle.svg'
import crownImage from '@/public/assets/icons/crownImage.svg'
import rightArrowImage from '@/public/assets/icons/rightArrow.svg'
import Image from 'next/image'
import { onTablet, onMobile } from '@/styles/mediaQuery'

function BeBridgeButton() {
  return (
    <>
      <StyledButton>
        <Wrapper>
          <Div>
            <CircleImage src={greenCircle} alt="초록원" />
            <Div2>
              비브리지
              <CrownImage src={crownImage} alt="왕관" />
            </Div2>
          </Div>
          <ArrowImage src={rightArrowImage} alt="화살표" />
        </Wrapper>
      </StyledButton>
    </>
  )
}

export default BeBridgeButton

const StyledButton = styled.button`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Wrapper = styled.div`
  display: flex;
  width: 292px;
  justify-content: space-between;
  align-items: center;

  ${onTablet} {
    width: 206px;
  }
  ${onMobile} {
    width: 220px;
  }
`

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const Div2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const CrownImage = styled(Image)`
  width: 20px;
  height: 16px;
  ${onTablet} {
    width: 17.5px;
    height: 14px;
  }
  ${onMobile} {
    width: 15px;
    height: 12px;
  }
`
const CircleImage = styled(Image)`
  width: 8px;
  height: 8px;
`
const ArrowImage = styled(Image)`
  width: 18px;
  height: 18px;
`
