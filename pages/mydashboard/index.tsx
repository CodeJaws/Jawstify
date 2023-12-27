import API from '@/apis/api';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import MyDashBoardButtonBox from '@/components/MyDashboard/MyDashBoardButtonBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDashBoard from '@/components/Table/InviteDashBoard';
import usePagination from '@/hooks/usePagination';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { localStorageSetItem } from '@/utils/localStorage';
import { useEffect } from 'react';
import styled from 'styled-components';

function MyDashBoard() {
  const loginFunc = async () => {
    const a = await API.auth.login({ email: 'test10@codeit.com', password: 'test12345' });
    localStorageSetItem('accessToken', a.accessToken);
  };
  const dashboardId = 203; // 대시보드 아이디 여기 수정하면 됩니다

  useEffect(() => {
    loginFunc();
  }, []);
  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={false} isOwner={true} title="내 대시보드" />
      <Sidebar />
      <StyledWrapper>
        <MyDashBoardButtonBox dashboardId={dashboardId} />
        <InviteDashBoard />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default MyDashBoard;

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledWrapper = styled.div`
  background: ${COLORS.GRAY_FA};
  position: absolute;
  top: 70px;
  left: 300px;
  width: 100%;
  padding: 40px;
  ${onTablet} {
    left: 160px;
    width: calc(100% - 160px);
  }
  ${onMobile} {
    left: 66px;
    width: calc(100% - 66px);
    padding: 24px;
  }
`;
