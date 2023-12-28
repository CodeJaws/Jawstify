import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import styled from 'styled-components';

/** Test용 Page입니다. */
function Test() {
  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={false} isOwner={true} title="내 대시보드" />
      <Sidebar boardId={340} />
    </StyledContainer>
  );
}

export default Test;

const StyledContainer = styled.div`
  width: 100%;
`;
