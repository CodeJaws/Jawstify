import Image from 'next/image'
import styled from 'styled-components'

import { fontStyle } from '@/styles/fontStyle'
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery'
import useDeviceType from '@/hooks/useDeviceType'

interface MembersProps {
  members: {
    imgUrl: string
    id: number
  }[]
}

/** 보여주는 프로필 이미지 목록 생성 - 추후에 들어오는 props값만 수정하면 됩니다. */
const makeNewMembers = (members: { imgUrl: string; id: number }[], deviceType: string) => {
  if (deviceType === 'pc') return members.slice(0, Math.min(members.length, 4))
  return members.slice(0, Math.min(members.length, 2))
}

function Members({ members }: MembersProps) {
  const deviceType = useDeviceType()

  let showMembers = makeNewMembers(members, deviceType)

  const checkMemberLength = (deviceType === 'pc' && members.length > 4) || (deviceType !== 'pc' && members.length > 2)

  if (members.length === 0) return null // member 없을 시
  return (
    <StyledContainer $cnt={members.length}>
      {showMembers.map((member, idx) => (
        <StyledImageContainer key={member.id} $idx={idx} $isLast={false}>
          <Image fill src={member.imgUrl} alt="프로필" />
        </StyledImageContainer>
      ))}

      {checkMemberLength && (
        <StyledImageContainer $idx={showMembers.length} $isLast={true}>
          <p>+{members.length - showMembers.length}</p>
        </StyledImageContainer>
      )}
    </StyledContainer>
  )
}

export default Members

const StyledContainer = styled.div<{ $cnt: number }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 40px;
  ${onPc} {
    width: ${(props) => (props.$cnt >= 5 ? '140' : (props.$cnt - 1) * 1.6 + 3)}px;
  }
  ${onTablet} {
    width: ${(props) => (props.$cnt >= 2 ? '80' : (props.$cnt - 1) * 1.6 + 3)}px;
  }
  ${onMobile} {
    width: ${(props) => (props.$cnt >= 2 ? '68' : (props.$cnt - 1) * 1.6 + 3)}px;
  }
`

const StyledImageContainer = styled.div<{ $idx: number; $isLast: boolean }>`
  overflow: hidden;
  border-radius: 100%;
  border: 2px solid #fff;
  position: absolute;
  width: 38px;
  height: 38px;
  left: ${(props) => props.$idx * 2.6}rem;

  background-color: ${(props) => (props.$isLast ? '#F4D7DA' : 'transparent')};

  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: #d25b68;
    text-align: center;
    ${fontStyle(16, 500)}
  }

  @media screen and (max-width: 375px) {
    width: 34px;
    height: 34px;
  }
`
