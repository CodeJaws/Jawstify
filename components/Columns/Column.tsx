import { default as API, default as api } from '@/apis/api';
import { INIT_MANAGE_COLUMN } from '@/constants/InitialModalValues';
import setting from '@/public/assets/icons/setting.svg';

import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { GetCardDetailsItem, GetColumnListProps } from '@/types/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import CountChip from '../Chip/CountChip';
import Modal from '../Modal/Modal';
import AddButton from '../common/Button/AddButton';
import Card from './Card';

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

  // 무한스크롤로 카드 리스트 가져오기
  const fetchHasMore = () => {
    if (columnCardList.length < cardListInfos.totalCount) {
      loadColumnCardList();
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

  // 컬럼 카드 리스트 데이터 api 요청 및 받은 데이터 렌더링
  const loadColumnCardList = async () => {
    const res = await API.cards.checkCardList({ columnId, cursorId: cardListInfos.cursorId, size: 4 });
    setColumnCardList((prev) => [...prev, ...res.cards]);
    setCardListInfos({ ...cardListInfos, totalCount: res.totalCount, cursorId: Number(res.cursorId) });
  };

  const handleColumnDelete = async () => {
    await api.columns.deleteColumn({ columnId: String(columnId) });
    await applyColumnDelete(dashboardId);
  };

  const handleManageColumnSubmit = async () => {
    const response = (await api.columns.correctColumn({
      columnId: String(columnId),
      title: manageColModalVals.이름,
    })) as { title: '' };
    setCardListInfos({ ...cardListInfos, title: response.title });
  };

  useEffect(() => {
    loadColumnCardList();
  }, [columnId]);

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
              loadColumnCardList(); // createToDo 모달에서 필요한 api 요청 처리
              setIsModalOpen({ ...isModalOpen, createToDo: false });
            }}
          />
        )}
        <InfiniteScroll pageStart={0} loadMore={fetchHasMore} hasMore={hasMore} useWindow={false} initialLoad={false}>
          <StyledSettingIconContainer onClick={() => handleModalsOpen('manageColumn')}>
            <Image fill src={setting} alt="설정 버튼" />
          </StyledSettingIconContainer>

          <StyledHeader>
            <div>{cardListInfos.title}</div>
            <StyledCountChip content={cardListInfos.totalCount} />
          </StyledHeader>
          <StyledWrapper>
            <AddButton onClick={() => handleModalsOpen('createToDo')} />

            {columnCardList.map((card) => (
              <li key={card.id}>
                <Card
                  cardInfoData={{ dashboardId, cardId: card.id }}
                  title={card.title}
                  dueDate={card.dueDate}
                  tags={card.tags}
                  assignee={card.assignee}
                  imageUrl={card.imageUrl}
                />
              </li>
            ))}
          </StyledWrapper>
        </InfiniteScroll>
      </StyledContainer>
    </>
  );
}

export default Column;

const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0.75rem;
  position: relative;
  border-bottom: 0.0625rem solid ${COLORS.GRAY_EE};
  height: 90vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onTablet} {
    height: fit-content;
    padding: 20px;
    width: 100%;
  }

  ${onPc} {
    width: 354px;
    padding: 1.25rem;
    border: none;
    border-right: 0.0625rem solid ${COLORS.GRAY_EE};
  }

  ${onMobile} {
    height: fit-content;
  }
`;

const StyledSettingIconContainer = styled.button`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 1.25rem;
  top: 1.25rem;
  cursor: pointer;

  ${onMobile} {
    width: 1.375rem;
    height: 1.375rem;
    right: 0.75rem;
    top: 0.75rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  gap: 0.75rem;
  ${fontStyle(18, 700)};
  margin-bottom: 1.5625rem;

  ${onMobile} {
    ${fontStyle(16, 700)};
    margin-bottom: 1.0625rem;
  }
`;

const StyledCountChip = styled(CountChip)`
  width: 1.25rem;
  height: 1.25rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${onMobile} {
    gap: 0.625rem;
  }
`;
