import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import TablePagination from '@/components/Table/TablePagination';
import BackImg from '@/public/assets/icons/LeftArrow.svg';
import API from '@/apis/api';
import { localStorageSetItem } from '@/utils/localStorage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { boardid } = context.query;

  const a = await API.auth.login({ email: 'test1@codeit.com', password: 'test12345' });
  console.log(a);
  localStorageSetItem('accessToken', a.accessToken);
  // const data = await API.members.getMembersInDashboard({ dashboardId: boardid as unknown as number });
  return {
    props: {
      // data,
      boardid,
    },
  };
};

function BoardEdit({ boardid }: any) {
  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={true} isOwner={true} title="으잉" />
      <Sidebar />
      <StyledWrapper>
        <StyledInWrapper>
          <StyledLink href={'/mydashboard'}>돌아가기</StyledLink>
          <StyledMainWrapper>
            <TablePagination dashboardId={boardid} table="members" />
            <TablePagination dashboardId={boardid} table="invitationDetails" />
          </StyledMainWrapper>
        </StyledInWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default BoardEdit;

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 1080px;
  background-color: ${COLORS.GRAY_FA};
`;

const StyledInWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 300px;
  width: calc(100% - 300px);
  height: 100vh;
  padding: 20px;

  ${onTablet} {
    left: 160px;
    width: calc(100% - 160px);
  }
  ${onMobile} {
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
`;

const StyledMainWrapper = styled.div`
  margin-top: 25px;
  gap: 12px;
`;
