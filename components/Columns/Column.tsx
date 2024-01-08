import { default as API, default as api } from '@/apis/api';
import CountChip from '@/components/Chip/CountChip';
import Card from '@/components/Columns/Card';
import Modal from '@/components/Modal/Modal';
import AddButton from '@/components/common/Button/AddButton';
import { INIT_MANAGE_COLUMN } from '@/constants/InitialModalValues';
import useRefresh from '@/hooks/useRefresh';
import BlueEllipse from '@/public/assets/icons/BlueEllipse.svg';
import setting from '@/public/assets/icons/setting.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { GetCardDetailsItem, GetColumnListProps } from '@/types/api';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

interface Props extends GetColumnListProps {
  columnId: number;
  title: string;
  applyColumnDelete: (dashboardId: number) => Promise<void>;
}

function Column({ title: defaultTitle, columnId, dashboardId, applyColumnDelete }: Props) {
  const [columnCardList, setColumnCardList] = useState<GetCardDetailsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState({
    manageColumn: false,
    createToDo: false,
  });
  const [cardListInfos, setCardListInfos] = useState({
    title: defaultTitle,
    totalCount: 0,
    cursorId: 0,
  });
  const [manageColModalVals, setManageColModalVals] = useState<typeof INIT_MANAGE_COLUMN>(INIT_MANAGE_COLUMN);

  const { refresh } = useRefresh();

  // 무한스크롤로 카드 리스트 가져오기
  const fetchHasMore = () => {
    if (cardListInfos.cursorId !== 0) {
      loadColumCardList();
    } else {
      setHasMore(false);
    }
  };

  // 모달 open 여부 관리
  const handleModalsOpen = (type: 'manageColumn' | 'createToDo') => {
    if (type === 'manageColumn') {
      setIsModalOpen({ ...isModalOpen, manageColumn: true });
    } else if (type === 'createToDo') {
      setIsModalOpen({ ...isModalOpen, createToDo: true });
    }
  };

  const firstFetch = async () => {
    const res = await API.cards.checkCardList({ columnId, size: 14 });
    setColumnCardList(res.cards);
    setCardListInfos({ ...cardListInfos, totalCount: res.totalCount, cursorId: Number(res.cursorId) });
  };

  const loadColumCardList = async () => {
    const res = await API.cards.checkCardList({ columnId, cursorId: cardListInfos.cursorId, size: 10 });
    setColumnCardList((prev) => [...prev, ...res.cards]);
    setCardListInfos({ ...cardListInfos, totalCount: res.totalCount, cursorId: Number(res.cursorId) });
  };

  const handleColumnDelete = async () => {
    if (window.confirm(`${cardListInfos.title} 컬럼을 정말 삭제하시겠습니까?`)) {
      const res = await api.columns.deleteColumn({ columnId: columnId });
      await applyColumnDelete(dashboardId);
    }
    return;
  };

  const handleManageColumnSubmit = async () => {
    const response = (await api.columns.correctColumn({
      columnId: Number(columnId),
      title: manageColModalVals.이름,
    })) as { title: '' };
    setCardListInfos({ ...cardListInfos, title: response.title });
  };

  useEffect(() => {
    firstFetch();
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
              firstFetch(); // createToDo 모달에서 필요한 api 요청 처리
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
              loadMore={fetchHasMore}
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
