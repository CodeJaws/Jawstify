import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import PasswordManagerBox from '@/components/MyPage/PasswordManagerBox';
import ProfileBox from '@/components/MyPage/ProfileBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import BackImg from '@/public/assets/icons/LeftArrow.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Link from 'next/link';
import { styled } from 'styled-components';

function MyPage() {
  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={false} isOwner={true} title={'주인공'} />
      <Sidebar />
      <StyledWrapper>
        <StyledInWrapper>
          <StyledBackWrapper href={'/mydashboard'}>돌아가기</StyledBackWrapper>
          <ProfileBox />
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
  }
`;

const StyledBackWrapper = styled(Link)`
  ${fontStyle(16, 500)}
  background-image: url(${BackImg.src});
  background-repeat: no-repeat;
  background-position: 0px 50%;
  padding-left: 20px;
`;