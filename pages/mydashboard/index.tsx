import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import MyDashBoardButtonBox from '@/components/MyDashboard/MyDashBoardButtonBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDashBoard from '@/components/Table/InviteDashBoard';
import useRedirectByLogin from '@/hooks/Auth/useRedirectByLogin';
import useMyDashboard from '@/hooks/Dashboard/useMyDashboard';
import { onMobile, onTablet } from '@/styles/mediaQuery';

import styled from 'styled-components';

function MyDashBoard() {
  useRedirectByLogin();

  const { resetToFirst, refreshToFirst } = useMyDashboard();

  return (
    <>
      <DashboardNavbar isMyDashboard={true} />
      <Sidebar />
      <StyledWrapper>
        <MyDashBoardButtonBox resetToFirst={resetToFirst} />
        <InviteDashBoard refreshToFirst={refreshToFirst} />
      </StyledWrapper>
    </>
  );
}

export default MyDashBoard;

const StyledWrapper = styled.main`
  position: absolute;
  top: 70px;
  left: 300px;
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
