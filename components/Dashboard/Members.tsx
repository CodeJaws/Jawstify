import Image from 'next/image';
import styled from 'styled-components';

import useDeviceType from '@/hooks/useDeviceType';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { createSlicedMembers } from '@/utils/createSlicedMembers';

interface MembersProps {
  members: {
    profileImageUrl: string;
    id: number;
  }[];
}

function Members({ members }: MembersProps) {
  const deviceType = useDeviceType();
  let showMembers = createSlicedMembers({ members, deviceType });
  const checkMemberLength = (deviceType === 'pc' && members.length > 4) || (deviceType !== 'pc' && members.length > 2);

  if (members.length === 0) return null;
  return (
    <StyledContainer $cnt={members.length}>
      {showMembers.map((member, idx) => (
        <StyledImageContainer key={member.id} $idx={idx} $isLast={false}>
          <Image fill src={member.profileImageUrl} alt="프로필" />
        </StyledImageContainer>
      ))}

      {checkMemberLength && (
        <StyledImageContainer $idx={showMembers.length} $isLast={true}>
          <p>+{members.length - showMembers.length}</p>
        </StyledImageContainer>
      )}
    </StyledContainer>
  );
}

export default Members;

const StyledContainer = styled.div<{ $cnt: number }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 40px;
  ${onPc} {
    width: ${(props) => (props.$cnt >= 5 ? '140' : (props.$cnt - 1) * 26 + 32)}px;
  }
  ${onTablet} {
    width: ${(props) => (props.$cnt > 2 ? '80' : (props.$cnt - 1) * 26 + 24)}px;
    margin-left: 32px;
  }
  ${onMobile} {
    width: ${(props) => (props.$cnt > 2 ? '68' : (props.$cnt - 1) * 26 + 12)}px;
    margin-left: 8px;
  }
`;

const StyledImageContainer = styled.div<{ $idx: number; $isLast: boolean }>`
  overflow: hidden;
  border-radius: 100%;
  border: 2px solid #fff;
  position: absolute;
  width: 38px;
  height: 38px;
  left: ${(props) => props.$idx * 26}px;

  background-color: ${(props) => (props.$isLast ? '#F4D7DA' : 'transparent')};

  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: #d25b68;
    text-align: center;
    ${fontStyle(16, 500)}
  }

  ${onMobile} {
    width: 34px;
    height: 34px;
  }
`;
