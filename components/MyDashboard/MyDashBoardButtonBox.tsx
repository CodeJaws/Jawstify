import styled from 'styled-components';

import Modal from '@/components/Modal/Modal';
import DashBoardAddButton from '@/components/common/Button/DashBoardAddButton';
import DashBoardButton from '@/components/common/Button/DashBoardButton';
import PaginationButton from '@/components/common/Button/PaginationButton';
import useMyDashBoardButtonBox from '@/hooks/Dashboard/useMyDashboardButtonBox';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';

export interface MyDashBoardButtonBoxProps {
  resetToFirst: boolean;
}

function MyDashBoardButtonBox({ resetToFirst }: MyDashBoardButtonBoxProps) {
  const { setIsOpen, allItems, totalPages, pageNum, handlePageNum, isOpen, setModalValue, handleCreate } =
    useMyDashBoardButtonBox({ resetToFirst });

  if (!pageNum || !totalPages) return null;
  return (
    <article>
      <ButtonBoxWrapper>
        <DashBoardAddButton onClick={() => setIsOpen(true)} />
        {allItems.map((item) => (
          <div key={item.id}>
            <DashBoardButton text={item.title as string} color={item.color} king={item.createdByMe} id={item.id} />
          </div>
        ))}
      </ButtonBoxWrapper>
      <PaginationWrapper>
        <PaginationPage>
          {totalPages} 페이지 중 {pageNum}
        </PaginationPage>
        <PaginationInWrapper>
          <PaginationButton active={pageNum !== 1} direction="left" onClick={() => handlePageNum(-1)} />
          <PaginationButton active={pageNum !== totalPages} direction="right" onClick={() => handlePageNum(1)} />
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
    </article>
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
  color: var(--content-main);
  ${fontStyle(14, 400)}

  ${onMobile} {
    font-size: 12px;
  }
`;

const PaginationInWrapper = styled.div`
  display: flex;
`;
