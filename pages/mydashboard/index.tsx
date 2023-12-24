import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import MyDashBoardButtonBox from '@/components/MyDashboard/MyDashBoardButtonBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDashBoard from '@/components/Table/InviteDashBoard';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import styled from 'styled-components';

function MyDashBoard() {
  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={true} isOwner={true} title="나나나" />
      <Sidebar />
      <StyledWrapper>
        <MyDashBoardButtonBox dashboardId={1} />
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
