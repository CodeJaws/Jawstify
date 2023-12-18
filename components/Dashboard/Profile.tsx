import Image from 'next/image'
import styled from 'styled-components'

import { fontStyle } from '@/styles/fontStyle'
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery'
import { COLORS } from '@/styles/palettes'

interface ProfileProps {
  item: {
    name: string
    imgUrl: string
  }
}

function Profile({ item }: ProfileProps) {
  const { name, imgUrl } = item
  return (
    <StyledContainer>
      <StyledImageWrapper>
        <Image fill src={imgUrl} alt="프로필" />
      </StyledImageWrapper>
      <p>{name}</p>
    </StyledContainer>
  )
}

export default Profile

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  p {
    color: ${COLORS.BLACK_200};
    ${fontStyle(16, 500)}
  }

  ${onPc} {
    margin-right: 80px;
  }

  ${onTablet} {
    margin-right: 40px;
  }
  ${onMobile} {
    margin-right: 12px;
    p {
      display: none;
    }
  }
`

const StyledImageWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 100%;
  overflow: hidden;
`
