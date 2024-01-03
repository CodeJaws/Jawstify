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
    const res = await API.cards.checkCardList({ columnId, cursorId: cardListInfos.cursorId, size: 10 });
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

        <StyledSettingIconContainer onClick={() => handleModalsOpen('manageColumn')}>
          <Image fill src={setting} alt="설정 버튼" />
        </StyledSettingIconContainer>

        <StyledHeader>
          <div>{cardListInfos.title}</div>
          <StyledCountChip content={cardListInfos.totalCount} />
        </StyledHeader>
        <StyledWrapper>
          <AddButton onClick={() => handleModalsOpen('createToDo')} />
          {columnCardList.length === 0 ? (
            <StyledBlank></StyledBlank>
          ) : (
            <StyledDiv>
              <InfiniteScroll
                pageStart={0}
                loadMore={fetchHasMore}
                hasMore={hasMore}
                useWindow={false}
                initialLoad={false}
              >
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
              </InfiniteScroll>
            </StyledDiv>
          )}
        </StyledWrapper>
      </StyledContainer>
    </>
  );
}

export default Column;

const StyledBlank = styled.div`
  height: 100%;
`;

const StyledDiv = styled.div`
  height: 90vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  ${onPc} {
    width: 354px;
    border: none;
    border-right: 0.0625rem solid ${COLORS.GRAY_EE};
  }

  ${onTablet} {
    height: fit-content;
    width: 100%;
    height: 20vh;
    overflow: scroll;
  }

  ${onMobile} {
    height: 40vh;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 7.5px 0 7.5px 35px;
  position: relative;
  border-bottom: 0.625px solid ${COLORS.GRAY_EE};
  &::-webkit-scrollbar {
    display: none;
  }
  ${onTablet} {
    padding: 7.5px 0 7.5px 7.5px;
  }
  ${onMobile} {
    padding: 7.5px;
  }
`;

const StyledSettingIconContainer = styled.button`
  position: absolute;
  width: 15px;
  height: 15px;
  right: 12.5px;
  top: 12.5px;
  cursor: pointer;

  ${onMobile} {
    width: 13.75px;
    height: 13.75px;
    right: 7.5px;
    top: 7.5px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  gap: 7.5px;
  ${fontStyle(18, 700)};
  margin-bottom: 15.625px;

  ${onMobile} {
    ${fontStyle(16, 700)};
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
