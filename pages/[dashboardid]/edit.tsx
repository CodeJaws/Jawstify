import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import API from '@/apis/api';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import DashboardEdit from '@/components/Edit/DashboardEdit';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDetailsTable from '@/components/Table/InviteDetailsTable';
import MembersTable from '@/components/Table/MembersTable';
import DeleteButton from '@/components/common/Button/DeleteButton';
import useDashboard from '@/hooks/useDashboard';
import BackImg from '@/public/assets/icons/LeftArrow.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import { useState } from 'react';


interface BoardEditProps {
  dashboardid: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { dashboardid } = context.query;

  if (!dashboardid) {
    return { notFound: true };
  }

  return {
    props: {
      dashboardid,
    },
  };
};

function BoardEdit({ dashboardid: dashboardId }: BoardEditProps) {

  const router = useRouter();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { members, totalMembers, dashboardData } = useDashboard({ dashboardId, refreshToggle });

  const refresh = () => setRefreshToggle((prev) => !prev);

  const deleteDashboard = async () => {
    if (confirm('정말 대시보드를 삭제하시겠습니까?')) {
      try {
        await API.dashboard.deleteDashboard({ dashboardId: String(dashboardId) });
        router.push('/mydashboard');
      } catch (e: any) {
        switch (e.data.message) {
          case '대시보드 삭제 권한이 없습니다.':
            alert('대시보드 삭제 권한이 없습니다.');
            break;
          case '대시보드가 존재하지 않습니다.':
            alert('대시보드가 존재하지 않습니다.');
            break;
        }
      }
    }
  };

  return (
    <StyledContainer>
      <DashboardNavbar members={members} totalMembers={totalMembers} dashboard={dashboardData} isMyDashboard={false} />
      <Sidebar />
      <StyledWrapper>
        <StyledInWrapper>
          <StyledLink href={`/dashboard/${dashboardId}`}>돌아가기</StyledLink>
          <StyledMainWrapper>
            <DashboardEdit dashboardData={dashboardData} refresh={refresh} />
            <div style={{ margin: '12px 0' }}>
              <MembersTable dashboardId={Number(dashboardId)} refresh={refresh} />
            </div>
            <InviteDetailsTable dashboardId={Number(dashboardId)} />
            <DeleteButton onClick={deleteDashboard} />
            {/* <StyledDeleteButton onClick={}>대시보드 삭제하기</StyledDeleteButton> */}
          </StyledMainWrapper>
        </StyledInWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default BoardEdit;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1080px;
`;

const StyledInWrapper = styled.div`
  background-color: var(--content-back);
  position: absolute;
  top: 70px;
  left: 300px;
  width: calc(100% - 300px);
  padding: 20px;

  ${onTablet} {
    left: 160px;
    width: calc(100% - 160px);
  }
  ${onMobile} {
    padding-left: 12px;
    padding-top: 16px;
    left: 66px;
    width: calc(100% - 66px);
  }
`;

const StyledLink = styled(Link)`
  ${fontStyle(16, 500)}
  background-image: url(${BackImg.src});
  background-repeat: no-repeat;
  background-position: 0px 50%;
  padding-left: 20px;
  color: var(--content-main);
  ${onMobile} {
    font-size: 1.4rem;
  }
`;

const StyledMainWrapper = styled.div`
  margin-top: 25px;
  gap: 12px;
`;
