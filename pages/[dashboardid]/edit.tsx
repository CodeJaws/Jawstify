import API from '@/apis/api';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import DashboardEdit from '@/components/Edit/DashboardEdit';
import Sidebar from '@/components/Sidebar/Sidebar';
import InviteDetailsTable from '@/components/Table/InviteDetailsTable';
import MembersTable from '@/components/Table/MembersTable';
import DeleteButton from '@/components/common/Button/DeleteButton';
import useDashboard from '@/hooks/useDashboard';
import useRedirectByDashboardId from '@/hooks/useRedirectByDashboardId';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import BackImg from '@/public/assets/icons/LeftArrow.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

interface BoardEditProps {
  dashboardId: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { dashboardid: dashboardId } = context.query;

  if (!dashboardId) {
    return { notFound: true };
  }

  return {
    props: {
      dashboardId: Number(dashboardId),
    },
  };
};

function BoardEdit({ dashboardId }: BoardEditProps) {
  useRedirectByDashboardId({ dashboardId });
  useRedirectByLogin();

  const router = useRouter();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { members, totalMembers, dashboardData } = useDashboard({ dashboardId, refreshToggle });
  const [inviteRefresh, setInviteRefresh] = useState(false);
  const refreshInvite = () => setInviteRefresh((prev) => !prev);
  const backHome = () => router.back();

  const refresh = () => setRefreshToggle((prev) => !prev);

  const deleteDashboard = async () => {
    if (confirm('정말 대시보드를 삭제하시겠습니까?')) {
      try {
        await API.dashboard.deleteDashboard({ dashboardId: Number(dashboardId) });
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
    <>
      <Helmet>
        <title>대시보드 수정 - Jawstify</title>
      </Helmet>
      <StyledContainer>
        <DashboardNavbar
          members={members}
          totalMembers={totalMembers}
          dashboard={dashboardData}
          isMyDashboard={false}
          refreshInvite={refreshInvite}
        />
        <Sidebar refreshToggle={refreshToggle} refresh={refresh} />
        <StyledWrapper>
          <StyledInWrapper>
            <StyledRouterButton onClick={backHome}>돌아가기</StyledRouterButton>
            <StyledMainWrapper>
              <DashboardEdit dashboardData={dashboardData} refresh={refresh} />
              <StyledMainInWrapper>
                <MembersTable dashboardId={Number(dashboardId)} refresh={refresh} />
              </StyledMainInWrapper>
              <InviteDetailsTable dashboardId={Number(dashboardId)} inviteRefresh={inviteRefresh} />
              <DeleteButton onClick={deleteDashboard} />
            </StyledMainWrapper>
          </StyledInWrapper>
        </StyledWrapper>
      </StyledContainer>
    </>
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

const StyledRouterButton = styled.button`
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

const StyledMainInWrapper = styled.div`
  margin: 12px 0px;
`;
