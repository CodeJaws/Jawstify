import CountChip from '@/components/Chip/CountChip';
import Card from '@/components/Columns/Card';
import Modal from '@/components/Modal/Modal';
import AddButton from '@/components/common/Button/AddButton';
import useColumns from '@/hooks/useColumn';
import useRefresh from '@/hooks/useRefresh';
import BlueEllipse from '@/public/assets/icons/BlueEllipse.svg';
import setting from '@/public/assets/icons/setting.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { GetColumnListProps } from '@/types/api';
import Image from 'next/image';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

export interface ColumnProps extends GetColumnListProps {
  columnId: number;
  title: string;
  applyColumnDelete: (dashboardId: number) => Promise<void>;
}

function Column({ title, columnId, dashboardId, applyColumnDelete }: ColumnProps) {
  const { refresh } = useRefresh();

  const {
    isColumnModalOpen: isModalOpen,
    setIsColumnModalOpen: setIsModalOpen,
    handleColumnModalsOpen: handleModalsOpen,
    cardListInfos,
    columnCardList,
    hasMore,
    fetchMoreCards,
    firstColumnDataFetch,
    handleColumnDelete,
    handleManageColumnSubmit,
    setManageColModalVals,
  } = useColumns({ title, columnId, dashboardId, applyColumnDelete });

  useEffect(() => {
    firstColumnDataFetch();
  }, [columnId, refresh]);

  return (
    <>
      <StyledContainer>
        {isModalOpen.manageColumn && (
          <Modal
            title="컬럼 관리"
            defaultValue={{ 이름: cardListInfos.title }}
            getValue={setManageColModalVals}
            onCancelClick={() => {
              setIsModalOpen({ ...isModalOpen, manageColumn: false });
            }}
            onOkClick={async () => {
              handleManageColumnSubmit();
              setIsModalOpen({ ...isModalOpen, manageColumn: false });
            }}
            onDeleteClick={() => {
              handleColumnDelete();
            }}
          />
        )}
        {isModalOpen.createToDo && (
          <Modal
            title="할 일 생성"
            dashboardInfos={{ columnId, dashboardId }}
            onCancelClick={() => {
              setIsModalOpen({ ...isModalOpen, createToDo: false });
            }}
            onOkClick={() => {
              firstColumnDataFetch(); // createToDo 모달에서 필요한 api 요청 처리
              setIsModalOpen({ ...isModalOpen, createToDo: false });
            }}
          />
        )}

        <StyledHeader>
          <Image src={BlueEllipse} width={8} height={8} alt={'파란색 원'} />
          <StyledTitle>{cardListInfos.title}</StyledTitle>
          <StyledCountChip content={cardListInfos.totalCount} />
          <StyledSettingIconContainer onClick={() => handleModalsOpen('manageColumn')}>
            <Image fill src={setting} alt="설정 버튼" />
          </StyledSettingIconContainer>
        </StyledHeader>
        <StyledWrapper>
          <AddButton onClick={() => handleModalsOpen('createToDo')} />
          <StyledDiv $length={columnCardList.length}>
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchMoreCards}
              hasMore={hasMore}
              useWindow={false}
              initialLoad={false}
              style={{ display: 'flex', flexDirection: 'column', gap: '.6875rem' }}
            >
              {columnCardList.map((card) => (
                <ul key={card.id}>
                  <li>
                    <Card
                      cardInfoData={{ dashboardId, cardId: card.id }}
                      title={card.title}
                      dueDate={card.dueDate}
                      tags={card.tags}
                      assignee={card.assignee}
                      imageUrl={card.imageUrl}
                    />
                  </li>
                </ul>
              ))}
            </InfiniteScroll>
          </StyledDiv>
        </StyledWrapper>
      </StyledContainer>
    </>
  );
}

export default Column;

const StyledDiv = styled.div<{ $length: number }>`
  height: 77vh;
  overflow: scroll;
  display: flex;
  gap: 0.625rem;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onPc} {
    border: none;
  }

  ${onTablet} {
    width: 100%;
    height: ${({ $length }) => ($length < 4 ? '100%' : '21vh')};
    overflow: scroll;
  }

  ${onMobile} {
    height: 100%;
    max-height: 30vh;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 1.25rem 2.1875rem 0.4688rem;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onTablet} {
    padding: 1.25rem 0 0.4688rem;
  }
  ${onMobile} {
    padding: 1.0625rem 0 1.25rem;
  }
`;

const StyledTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledSettingIconContainer = styled.button`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: -2.625rem;
  top: -0.125rem;
  cursor: pointer;

  ${onMobile} {
    width: 0.8594rem;
    height: 0.8594rem;
    right: -1.875rem;
    top: 0.1875rem;
  }

  ${onTablet} {
    right: -2.5rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 17.125rem;
  gap: 0.5313rem;
  ${fontStyle(18, 700)};
  margin-bottom: 1.25rem;
  margin-right: 2.5rem;

  ${onTablet} {
    width: 31.5rem;
  }

  ${onMobile} {
    ${fontStyle(16, 700)};
    width: 15.875rem;
    margin-bottom: 0.6641rem;
  }
`;

const StyledCountChip = styled(CountChip)`
  width: 0.7813rem;
  height: 0.7813rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  ${onMobile} {
    gap: 0.3906rem;
  }
`;
