import API from '@/apis/api';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import MyDashBoardButtonBox from '@/components/MyDashboard/MyDashBoardButtonBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDashBoard from '@/components/Table/InviteDashBoard';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { localStorageSetItem } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function MyDashBoard() {
  const loginFunc = async () => {
    const a = await API.auth.login({ email: 'test1@codeit.com', password: 'test12345' });
    localStorageSetItem('accessToken', a.accessToken);
  };
  const dashboardId = 203; // 대시보드 아이디 여기 수정하면 됩니다
  const [resetToFirst, setResetToFirst] = useState(false);
  const [refreshPaginationToggle, setRefreshPaginationToggle] = useState(false);
  const refresh = () => setRefreshPaginationToggle((prev) => !prev);
  const refreshToFirst = () => setResetToFirst((prev) => !prev);

  useEffect(() => {
    loginFunc();
  }, []);

  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={true} />
      <Sidebar />
      <StyledWrapper>
        <MyDashBoardButtonBox
          dashboardId={dashboardId}
          resetToFirst={resetToFirst}
          refresh={refresh}
          refreshPaginationToggle={refreshPaginationToggle}
        />
        <InviteDashBoard refresh={() => refresh} refreshToFirst={() => refreshToFirst()} />
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
  height: 100%;
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
