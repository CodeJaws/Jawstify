import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { onTablet, onPc } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Columns from '@/components/Columns/Columns';
import { localStorageSetItem } from '@/utils/localStorage';
import { useEffect } from 'react';
import API from '@/apis/api';


function DashBoardID() {
  const router = useRouter();
  const { dashboardid: id } = router.query;

  const loginFunc = async () => {
    const a = await API.auth.login({ email: 'test5@codeit.com', password: 'test12345' });
    localStorageSetItem('accessToken', a.accessToken);
  };

  useEffect(() => {
    loginFunc();
  }, []);

  return (
    <StyledContainer>
      <Sidebar />
      <DashboardNavbar isMyDashboard={false} isOwner={true} title='비브리지' />
      <StyledWrapper>
        <Columns />
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
  width: 100%;
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
