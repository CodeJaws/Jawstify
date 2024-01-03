import Columns from '@/components/Columns/Columns';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Modal from '@/components/Modal/Modal';
import Sidebar from '@/components/Sidebar/Sidebar';
import useCardOpen from '@/hooks/ModalCard/useCardOpen';
import useRedirectByDashboardId from '@/hooks/useRedirectByDashboardId';
import useRedriectByLogin from '@/hooks/useRedriectByLogin';
import { onPc, onTablet } from '@/styles/mediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function DashBoardID() {
  useRedriectByLogin();
  const router = useRouter();
  const { isCardOpen } = useCardOpen();

  const dashboardid = router.asPath.slice(11);
  const { dashboardid: id } = router.query;

  useRedriectByLogin();
  useRedirectByDashboardId({ dashboardId: Number(id) });

  return (
    <>
      <StyledContainer>
        <Sidebar />
        <DashboardNavbar isMyDashboard={false} />
        <StyledWrapper>
          <Columns dashboardId={Number(dashboardid)} />
        </StyledWrapper>
      </StyledContainer>
      {isCardOpen && <Modal title="카드" onOkClick={() => {}} />}
    </>
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
