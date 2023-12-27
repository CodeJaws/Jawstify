import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { onTablet, onPc } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function DashBoardID() {
  const router = useRouter();
  const { dashboardid: id } = router.query;

  return (
    <StyledContainer>
      <Sidebar />
      <DashboardNavbar isMyDashboard={false} isOwner={true} title='비브리지' />
      <StyledWrapper>
        
      </StyledWrapper>
    </StyledContainer>
  );
}

export default DashBoardID;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledWrapper = styled.div`
  border: 1px solid #000;
  width: 100%;
  height: 100%;
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
