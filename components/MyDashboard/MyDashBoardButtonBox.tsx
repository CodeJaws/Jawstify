import API from '@/apis/api';
import Modal from '@/components/Modal/Modal';
import usePagination from '@/hooks/usePagination';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { DashboardType } from '@/types/apiType';
import { useState } from 'react';
import styled from 'styled-components';
import DashBoardAddButton from '../common/Button/DashBoardAddButton';
import DashBoardButton from '../common/Button/DashBoardButton';
import PaginationButton from '../common/Button/PaginationButton';

interface usePaginationProps {
  handlePagination: (val: number) => void;
  pageNum: number;
  allItems: DashboardType[];
  totalPages: number;
}

interface MyDashBoardButtonBoxProps {
  resetToFirst: boolean;
  refresh: () => void;
  refreshPaginationToggle: boolean;
}

const limit = 5;

function MyDashBoardButtonBox({ resetToFirst, refresh, refreshPaginationToggle }: MyDashBoardButtonBoxProps) {
  const { handlePagination, pageNum, allItems, totalPages } = usePagination({
    size: 10,
    showItemNum: limit,
    type: 'dashboard',
    refreshPaginationToggle,
    resetToFirst,
  }) as usePaginationProps;
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    '대시보드 이름': '',
    색상: '',
  });

  const setModalValue = (
    values = {
      '대시보드 이름': '',
      색상: '',
    },
  ) => {
    setValues(values); // value = modal에 입력된 input value들의 집합
  };

  const showItems = allItems.slice((pageNum - 1) * limit, (pageNum - 1) * limit + limit);

  const handleCreate = async () => {
    await API.dashboard.createDashboard({ title: values['대시보드 이름'], color: values.색상 });
    refresh();
  };

  return (
    <div>
      <ButtonBoxWrapper>
        <DashBoardAddButton
          onClick={() => {
            setIsOpen(true);
          }}
        />
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
      {isOpen && (
        <Modal
          title="새로운 대시보드"
          getValue={setModalValue}
          onCancelClick={() => {
            setIsOpen(false);
          }}
          onOkClick={() => {
            handleCreate();
            setIsOpen(false);
          }}
        />
      )}
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
