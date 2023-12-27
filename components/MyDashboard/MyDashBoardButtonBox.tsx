import usePagination, { DashboardItem } from '@/hooks/usePagination';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useState } from 'react';
import styled from 'styled-components';
import DashBoardAddButton from '../common/Button/DashBoardAddButton';
import DashBoardButton from '../common/Button/DashBoardButton';
import PaginationButton from '../common/Button/PaginationButton';

const mock = [
  { id: 1, text: '일' },
  { id: 2, text: '이' },
  { id: 3, text: '삼' },
  { id: 4, text: '사' },
  { id: 5, text: '오' },
  { id: 6, text: '육' },
  { id: 7, text: '칠' },
  { id: 8, text: '팔' },
  { id: 9, text: '구' },
  { id: 10, text: '십' },
  { id: 11, text: '십일' },
  { id: 12, text: '십이' },
];

interface usePaginationProps {
  handlePagination: (val: number) => void;
  pageNum: number;
  showItems: DashboardItem[];
  totalPages: number;
  totalCount: number;
}

function MyDashBoardButtonBox() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const firstIndex = (page - 1) * limit;
  const lastIndex = firstIndex + limit;
  // const currentItem = mock.slice(firstIndex, lastIndex);
  const { handlePagination, pageNum, showItems, totalPages, totalCount } = usePagination({
    size: 20,
    showItemNum: 5,
    type: 'dashboard',
    dashboardId: 203,
  }) as usePaginationProps;
  // const totalItemCount = Object.keys(mock).length;

  // const lastPages = Math.ceil(totalItemCount / 5);
  const lastPages = Math.ceil(totalPages / 5);

  return (
    <div>
      <ButtonBoxWrapper>
        <DashBoardAddButton onClick={() => {}} />
        {showItems.map((item) => (
          <div key={item.id}>
            <DashBoardButton text={item.title as string} color="" king={true} onClick={() => {}} />
          </div>
        ))}
      </ButtonBoxWrapper>
      <PaginationWrapper>
        <PaginationPage>
          {Math.ceil(totalCount / 5)} 페이지 중 {pageNum}
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