import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import MyDashBoardButtonBox from '@/components/MyDashboard/MyDashBoardButtonBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDashBoard from '@/components/Table/InviteDashBoard';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useState } from 'react';
import styled from 'styled-components';

function MyDashBoard() {
  useRedirectByLogin();

  const [resetToFirst, setResetToFirst] = useState(false);
  const [refreshPaginationToggle, setRefreshPaginationToggle] = useState(false);
  const refresh = () => setRefreshPaginationToggle((prev) => !prev);
  const refreshToFirst = () => setResetToFirst((prev) => !prev);

  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={true} />
      <Sidebar />
      <StyledWrapper>
        <MyDashBoardButtonBox
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
  background: var(--content-bg);
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
