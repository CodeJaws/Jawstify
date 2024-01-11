import CountChip from '@/components/Chip/CountChip';
import Card from '@/components/Columns/Card';
import Modal from '@/components/Modal/Modal';
import AddButton from '@/components/common/Button/AddButton';
import useColumns from '@/hooks/Dashboard/useColumn';
import useRefresh from '@/hooks/Common/useRefresh';
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
    loadColumCardList,
    fetchMoreCards,
    handleColumnDelete,
    handleManageColumnSubmit,
    setManageColModalVals,
  } = useColumns({ title, columnId, dashboardId, applyColumnDelete });

  useEffect(() => {
    loadColumCardList(true);
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
              loadColumCardList(true); // createToDo 모달에서 필요한 api 요청 처리
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
              style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
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
  gap: 10px;

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
  padding: 20px 35px 7.5px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onTablet} {
    padding: 20px 0 7.5px;
  }
  ${onMobile} {
    padding: 17px 0 20px;
  }
`;

const StyledTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledSettingIconContainer = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  right: -42px;
  top: -2px;
  cursor: pointer;

  ${onMobile} {
    width: 13.75px;
    height: 13.75px;
    right: -30px;
    top: 3px;
  }

  ${onTablet} {
    right: -40px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 274px;
  gap: 8.5px;
  ${fontStyle(18, 700)};
  margin-bottom: 20px;
  margin-right: 40px;

  ${onTablet} {
    width: 504px;
  }

  ${onMobile} {
    ${fontStyle(16, 700)};
    width: 254px;
    margin-bottom: 10.625px;
  }
`;

const StyledCountChip = styled(CountChip)`
  width: 12.5px;
  height: 12.5px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${onMobile} {
    gap: 6.25px;
  }
`;
