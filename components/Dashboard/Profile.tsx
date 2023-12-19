import Image from 'next/image'
import styled from 'styled-components'

import { fontStyle } from '@/styles/fontStyle'
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery'
import { COLORS } from '@/styles/palettes'

interface ProfileProps {
  item: {
    id: number
    nickname: string
    profileImageUrl: string
  }
}

function Profile({ item }: ProfileProps) {
  const { nickname, profileImageUrl } = item
  return (
    <StyledContainer>
      <StyledImageWrapper>
        <Image fill src={profileImageUrl} alt="프로필" />
      </StyledImageWrapper>
      <p>{nickname}</p>
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
  border: 2px solid ${COLORS.WHITE};
  overflow: hidden;

  ${onMobile} {
    width: 34px;
    height: 34px;
  }
`
