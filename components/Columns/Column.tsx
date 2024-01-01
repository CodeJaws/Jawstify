import API from '@/apis/api';
import setting from '@/public/assets/icons/setting.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CountChip from '../Chip/CountChip';
import AddButton from '../common/Button/AddButton';
import Card from './Card';
import { GetCardDetailsItem, GetColumnListProps } from '@/types/api';
import Modal from '../Modal/Modal';
import api from '@/apis/api';
import { INIT_MANAGE_COLUMN, INIT_CREATE_TODO } from '@/constants/InitialModalValues';
import { Tag } from '../Input/ModalInputContainer/TagInput';
import InfiniteScroll from 'react-infinite-scroller';

interface Props extends GetColumnListProps {
  columnId: number;
  title: string;
  applyColumnDelete: (dashboardId: number) => Promise<void>;
}

function Column({ title: defaultTitle, columnId, dashboardId, applyColumnDelete }: Props) {
  console.log(columnId);
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
  const [createToDoModalVals, setCreateToDoModalVals] = useState<typeof INIT_CREATE_TODO>(INIT_CREATE_TODO);

  // 무한스크롤 카드 리스트 가져오기
  const fetchHasMore = () => {
    // 여기는 총 개수 totalCount
    if (columnCardList.length < cardListInfos.totalCount) {
      loadColumnCardList();
    } else {
      setHasMore(false);
    }
  };

  // 모달 관리
  const handleModalsOpen = (type: 'manageColumn' | 'createToDo') => {
    if (type === 'manageColumn') {
      setIsModalOpen({ ...isModalOpen, manageColumn: true });
    } else if (type === 'createToDo') {
      setIsModalOpen({ ...isModalOpen, createToDo: true });
    }
  };

  // const setManageColumnVal = (values: typeof INIT_MANAGE_COLUMN) =>
  //   setModalValues({ ...modalValues, manageColumn: values });

  // const setCreateToDoVal = (values: any) => setModalValues({ ...modalValues, createToDo: values });

  // 컬럼 카드 리스트 response 요청
  const loadColumnCardList = async () => {
    const res = await API.cards.checkCardList({ columnId, cursorId: cardListInfos.cursorId, size: 10 });
    await setColumnCardList(res.cards);
    await setCardListInfos({ ...cardListInfos, totalCount: res.totalCount, cursorId: Number(res.cursorId) });
  };

  // Modal Input Values Submit Events
  const handleColumnDelete = async () => {
    const response = await api.columns.deleteColumn({ columnId: String(columnId) });
    await applyColumnDelete(dashboardId);
    console.log(response);
  };

  const handleManageColumnSubmit = async () => {
    const response = (await api.columns.correctColumn({
      columnId: String(columnId),
      title: manageColModalVals.이름,
    })) as { title: '' };
    setCardListInfos({ ...cardListInfos, title: response.title });
    console.log(response.title);
  };

  const handleCreateToDoSubmit = async () => {
    const formatedTagData: string[] = createToDoModalVals.태그.map((tagEl: Tag) =>
      [tagEl.value, tagEl.color, tagEl.backgroundColor].join('/'),
    );

    const body = {
      assigneeUserId: 0,
      // assigneeUserId const {user : {id: assigneeUserId}} = useUser();
      dashboardId: dashboardId,
      columnId: columnId,
      title: createToDoModalVals.제목,
      description: createToDoModalVals.설명,
      dueDate: createToDoModalVals.마감일,
      tags: formatedTagData,
      // imageUrl: createToDoVal.이미지,
      imageUrl:
        'https%3A%2F%2Fsprint-fe-project.s3.ap-northeast-2.amazonaws.com%2Ftaskify%2Ftask_image%2F1-5_1012_1703665850084.jpeg',
    };
    const response = await api.cards.createCard(body);
    console.log(response);
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
              console.log('취소');
              setIsModalOpen({ ...isModalOpen, manageColumn: false });
            }}
            onOkClick={async () => {
              console.log('확인');
              console.log({ ...isModalOpen, manageColumn: false }); // 모달 input value 출력
              // console.log(modalValues.manageColumn);
              handleManageColumnSubmit();
              // TODO: api status == 200 인지 확인하고 닫아야함
              setIsModalOpen({ ...isModalOpen, manageColumn: false });
              // await loadColumnCardList();
            }}
            onDeleteClick={() => {
              handleColumnDelete();
            }}
          />
        )}
        {isModalOpen.createToDo && (
          <Modal
            title="할 일 생성"
            getValue={setCreateToDoModalVals}
            onCancelClick={() => {
              setIsModalOpen({ ...isModalOpen, createToDo: false });
            }}
            onOkClick={() => {
              // console.log(modalValues.createToDo); // 모달 input value 출력
              handleCreateToDoSubmit();
            }}
            // onDeleteClick={() => {
            //   console.log('삭제');
            // }}
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
