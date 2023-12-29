import Link from 'next/link';
import styled from 'styled-components';

import useUserData from '@/hooks/global/useUserData';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import { localStorageRemoveItem } from '@/utils/localStorage';

function DashboardDropdown() {
  const { setUser } = useUserData();

  const logout = () => {
    setUser({
      createdAt: '',
      email: '',
      id: 0,
      nickname: '',
      profileImageUrl: '',
      updatedAt: '',
    });
    localStorageRemoveItem('accessToken');
  };

  return (
    <StyledContainer>
      <StyledLink href="/" onClick={() => logout()}>
        로그아웃
      </StyledLink>
      <StyledLink href="/mypage">내 정보</StyledLink>
      <StyledLink href="/myboard">내 대시보드</StyledLink>
    </StyledContainer>
  );
}

export default DashboardDropdown;

const StyledContainer = styled.div`
  position: absolute;
  width: 100px;
  height: min-content;
  background-color: ${COLORS.WHITE_FF};
  top: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLORS.GRAY_78};
  border-radius: 2px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  ${fontStyle(16, 200)}
  &:hover {
    background-color: ${COLORS.GRAY_F5};
  }
`;
