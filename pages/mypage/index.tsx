import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import PasswordManagerBox from '@/components/MyPage/PasswordManagerBox';
import ProfileBox from '@/components/MyPage/ProfileBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import useUserData from '@/hooks/global/useUserData';
import BackImg from '@/public/assets/icons/LeftArrow.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function MyPage() {
  const { user } = useUserData();
  const [nickname, setNickName] = useState('');

  useEffect(() => {
    setNickName(user.nickname);
  }, [user]);
  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={false} />
      <Sidebar />
      <StyledWrapper>
        <StyledInWrapper>
          <StyledBackWrapper href={'/mydashboard'}>돌아가기</StyledBackWrapper>
          <ProfileBox
            email={user.email}
            nickname={nickname}
            profileImg={user.profileImageUrl}
            setNickName={setNickName}
          />
          <PasswordManagerBox />
        </StyledInWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default MyPage;

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 1080px;
  background-color: ${COLORS.GRAY_EE};
`;

const StyledInWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 300px;
  width: calc(100% - 300px);
  height: 100vh;
  padding: 20px;

  ${onTablet} {
    left: 160px;
    width: calc(100% - 160px);
  }
  ${onMobile} {
    left: 66px;
    width: calc(100% - 66px);
    padding: 16px 12px;
  }
`;

const StyledBackWrapper = styled(Link)`
  ${fontStyle(16, 500)}
  background-image: url(${BackImg.src});
  background-repeat: no-repeat;
  background-position: 0px 50%;
  padding-left: 20px;

  ${onMobile} {
    background-size: 18px 18px;
    font-size: 1.4rem;
  }
`;
