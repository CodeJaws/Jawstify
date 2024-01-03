import Columns from '@/components/Columns/Columns';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import useDashboard from '@/hooks/useDashboard';
import useRedirectByDashboardId from '@/hooks/useRedirectByDashboardId';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import { onPc, onTablet } from '@/styles/mediaQuery';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

interface DashBoardIDProps {
  dashboardId: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { dashboardid: dashboardId } = context.query;

  if (!dashboardId) {
    return { notFound: true };
  }

  return {
    props: {
      dashboardId,
    },
  };
};

function DashBoardID({ dashboardId }: DashBoardIDProps) {
  useRedirectByLogin();
  useRedirectByDashboardId({ dashboardId });
  const { members, totalMembers, dashboardData } = useDashboard({ dashboardId });
  const [reset, setReset] = useState(false);

  return (
    <StyledContainer>
      <Sidebar reset={reset} setReset={setReset} />
      <DashboardNavbar members={members} totalMembers={totalMembers} dashboard={dashboardData} isMyDashboard={false} />
      <StyledWrapper>
        <Columns dashboardId={Number(dashboardId)} />
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
