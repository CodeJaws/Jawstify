import { onMobile, onTablet } from '@/styles/mediaQuery';
import styled from 'styled-components';
import DashBoardAddButton from '../common/Button/DashBoardAddButton';
import DashBoardButton from '../common/Button/DashBoardButton';
import PaginationButton from '../common/Button/PaginationButton';
import usePagination from '@/hooks/usePagination';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';

interface MyDashBoardButtonBoxProps {
  dashboardId: number;
}

function MyDashBoardButtonBox({ dashboardId }: MyDashBoardButtonBoxProps) {
  const { handlePagination, pageNum, showItems, totalPages, totalCount } = usePagination({
    size: 20,
    showItemNum: 4,
    type: 'members',
    dashboardId,
  });

  return (
    <div>
      <ButtonBoxWrapper>
        <DashBoardAddButton onClick={() => {}} />
        <DashBoardButton text="비브리지" color="dd" king={true} onClick={() => {}} />
        <DashBoardButton text="비브리지" color="dd" king={true} onClick={() => {}} />
        <DashBoardButton text="비브리지" color="dd" king={true} onClick={() => {}} />
        <DashBoardButton text="비브리지" color="dd" king={true} onClick={() => {}} />
        <DashBoardButton text="비브리지" color="dd" king={true} onClick={() => {}} />
      </ButtonBoxWrapper>
      <PaginationWrapper>
        <PaginationPage>
          {Math.ceil(totalCount / 4)} 페이지 중 {pageNum}
        </PaginationPage>
        <PaginationInWrapper>
          <PaginationButton active={true} direction="left" onClick={() => {}} />
          <PaginationButton active={true} direction="right" onClick={() => {}} />
        </PaginationInWrapper>
      </PaginationWrapper>
    </div>
  );
}

export default MyDashBoardButtonBox;

const ButtonBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 12px;
  gap: 12px;
  width: 1023px;
  height: 100%;
  ${onTablet} {
    padding-bottom: 10px;
    grid-template-columns: 1fr 1fr;

    width: 504px;
    height: 280px;
  }
  ${onMobile} {
    padding-bottom: 8px;
    grid-template-columns: 1fr;
    width: 260px;
    height: 435px;
  }
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  width: 1023px;
  padding-bottom: 44px;
  ${onTablet} {
    width: 504px;
    padding-bottom: 40px;
  }
  ${onMobile} {
    gap: 12px;
    width: 260px;
    padding-bottom: 24px;
  }
`;

const PaginationPage = styled.div`
  color: ${COLORS.BLACK_33};
  ${fontStyle(14, 400)}
  ${onMobile} {
    font-size: 12px;
  }
`;

const PaginationInWrapper = styled.div`
  display: flex;
`;
