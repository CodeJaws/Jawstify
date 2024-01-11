import Image from 'next/image';
import styled from 'styled-components';

import useMembers from '@/hooks/DashboardNavbar/useMembers';
import DefaultProfile from '@/public/assets/images/jaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { GetMembersInDashboardItem } from '@/types/api';

export type MemberType = GetMembersInDashboardItem['members'][0];

export interface MembersProps {
  members: MemberType[];
  totalMembers: number;
}

function Members({ members, totalMembers }: MembersProps) {
  const { showMembers, checkMemberLength } = useMembers({ members, totalMembers });
  if (totalMembers === 0) return null;

  return (
    <StyledContainer $cnt={totalMembers}>
      {showMembers.map((member, idx) => (
        <StyledImageContainer key={member.id} $idx={idx} $isLast={false}>
          <Image width={38} height={38} src={member.profileImageUrl || DefaultProfile} alt="프로필" />
        </StyledImageContainer>
      ))}

      {checkMemberLength && (
        <StyledImageContainer $idx={showMembers.length} $isLast={true}>
          <p>+{totalMembers - showMembers.length}</p>
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
  border: var(--nav-imgBorder);
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
