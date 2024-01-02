import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { onTablet, onPc } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Columns from '@/components/Columns/Columns';

function DashBoardID() {
  const router = useRouter();
  const dashboardid = router.asPath.slice(11);
  return (
    <StyledContainer>
      <Sidebar />
      <DashboardNavbar isMyDashboard={false} />
      <StyledWrapper>
        <Columns dashboardId={Number(dashboardid)} />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default DashBoardID;

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledWrapper = styled.div`
  width: -webkit-fill-available;
  position: absolute;
  top: 70px;
  left: 67px;

  ${onTablet} {
    left: 160px;
  }

  ${onPc} {
    left: 300px;
  }
`;
