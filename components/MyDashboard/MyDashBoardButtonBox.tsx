import usePagination from '@/hooks/usePagination';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { DashboardType } from '@/types/apiType';
import styled from 'styled-components';
import DashBoardAddButton from '../common/Button/DashBoardAddButton';
import DashBoardButton from '../common/Button/DashBoardButton';
import PaginationButton from '../common/Button/PaginationButton';

interface usePaginationProps {
  handlePagination: (val: number) => void;
  pageNum: number;
  showItems: DashboardType[];
  totalPages: number;
}

interface MyDashBoardButtonBoxProps {
  dashboardId: number;
  reset: boolean;
}

function MyDashBoardButtonBox({ dashboardId, reset }: MyDashBoardButtonBoxProps) {
  const limit = 5;
  const { handlePagination, pageNum, showItems, totalPages } = usePagination({
    size: 10,
    showItemNum: limit,
    type: 'dashboard',
    dashboardId: 203,
    reset,
  }) as usePaginationProps;

  return (
    <div>
      <ButtonBoxWrapper>
        <DashBoardAddButton onClick={() => {}} />
        {showItems.map((item) => (
          <div key={item.id}>
            <DashBoardButton
              text={item.title as string}
              color={item.color}
              king={item.createdByMe}
              onClick={() => {}}
              id={item.id}
            />
          </div>
        ))}
      </ButtonBoxWrapper>
      <PaginationWrapper>
        <PaginationPage>
          {totalPages} 페이지 중 {pageNum}
        </PaginationPage>
        <PaginationInWrapper>
          <PaginationButton active={pageNum !== 1} direction="left" onClick={() => handlePagination(-1)} />
          <PaginationButton active={pageNum !== totalPages} direction="right" onClick={() => handlePagination(1)} />
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
    height: 100%;
  }
  ${onMobile} {
    padding-bottom: 8px;
    grid-template-columns: 1fr;
    width: 260px;
    height: 100%;
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
