import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import MyDashBoardButtonBox from '@/components/MyDashboard/MyDashBoardButtonBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDashBoard from '@/components/Table/InviteDashBoard';
import useMyDashboard from '@/hooks/useMyDashboard';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import styled from 'styled-components';

function MyDashBoard() {
  useRedirectByLogin();

  const { refresh, resetToFirst, refreshPaginationToggle, refreshToFirst } = useMyDashboard();

  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={true} />
      <Sidebar refresh={refresh} />
      <StyledWrapper>
        <MyDashBoardButtonBox
          resetToFirst={resetToFirst}
          refresh={refresh}
          refreshPaginationToggle={refreshPaginationToggle}
        />
        <InviteDashBoard refresh={refresh} refreshToFirst={refreshToFirst} />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default MyDashBoard;

const StyledContainer = styled.div`
  background: var(--content-back);
  width: 100%;
  height: 100vh;
`;

const StyledWrapper = styled.div`
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
