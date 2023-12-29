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
import { CreateCardProps, GetCardDetailsItem, GetColumnListProps } from '@/types/api';
import Modal from '../Modal/Modal';
import api from '@/apis/api';
import { Certificate } from 'crypto';
import { INIT_MANAGE_COLUMN, INIT_CREATE_N_EDIT_TODO } from '@/constants/InitialModalValues';
import { Tag } from '../Input/ModalInputContainer/TagInput';

interface Props extends GetColumnListProps {
  columnId: number;
  title: string;
  applyColumnDelete: (dashboardId: number) => Promise<void>;
}

function Column({ title: defaultTitle, columnId, dashboardId, applyColumnDelete }: Props) {
  const [cards, setCards] = useState<GetCardDetailsItem[]>([]);
  const [title, setTitle] = useState(defaultTitle);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState({
    setting: false,
    create: false,
  });

  // 컬럼 관리 할 일 생성
  const [manageColumnVal, setManageColumnVal] = useState(INIT_MANAGE_COLUMN);
  const [createToDoVal, setCreateToDo] = useState(INIT_CREATE_N_EDIT_TODO);

  // 카드 목록 조회
  const getCardListFunc = async () => {
    const res = await API.cards.checkCardList({ columnId });
    const cards = res?.cards;
    const totalCount = res?.totalCount;
    setCards(cards);
    setTotalCount(totalCount);
    console.log(cards);
  };

  const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('할일 생성 모달');
    setIsOpen({ ...isOpen, create: true });
  };

  // const createToDoFunc = async (value: CreateCardProps) => {
  //   const res = await API.cards.createCard(value);
  //   console.log(res);
  // }

  const setModalValue = (values: { 이름: '' }) => {
    setManageColumnVal(values);
  };

  const setModalValue2 = (values: any) => {
    setCreateToDo(values);
  };

  const handleClickSetting = (e: React.MouseEvent<HTMLElement>) => {
    console.log('컬럼 수정 모달');
    setIsOpen({ ...isOpen, setting: true });
  };

  // export interface CreateCardProps {
  //   assigneeUserId?: number;
  //   dashboardId: number;
  //   columnId: number;
  //   title: string;
  //   description: string;
  //   dueDate?: string;
  //   tags?: string[];
  //   imageUrl?: string | null | ArrayBuffer;
  // }

  const handleCreateToDoSubmit = async () => {
    const formatedTagData: string[] = createToDoVal.태그.map((tagEl: Tag) =>
      [tagEl.value, tagEl.color, tagEl.backgroundColor].join('/'),
    );
    const body = {
      assigneeUserId: 0,
      // assigneeUserId const {user : {id: assigneeUserId}} = useUser();
      dashboardId: dashboardId,
      columnId: columnId,
      title: createToDoVal.제목,
      description: createToDoVal.설명,
      dueDate: createToDoVal.마감일,
      tags: formatedTagData,
      // imageUrl: createToDoVal.이미지,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/1-4_166_1703867195161.jpeg',
    };
    const response = await api.cards.createCard(body);
    console.log(response);
  };

  const handleManageColumnSubmit = async () => {
    const response = (await api.columns.correctColumn({
      columnId: String(columnId),
      title: manageColumnVal.이름,
    })) as { title: '' };
    setTitle(response.title);
    console.log(response.title);
  };

  const handleColumnDelete = async () => {
    const response = await api.columns.deleteColumn({ columnId: String(columnId) });
    await applyColumnDelete(dashboardId);
    console.log(response);
  };

  useEffect(() => {
    getCardListFunc();
  }, [columnId]);

  return (
    <StyledContainer>
      <StyledSettingIconContainer onClick={handleClickSetting}>
        <Image fill src={setting} alt="설정 버튼" />
      </StyledSettingIconContainer>
      {isOpen.setting && (
        <Modal
          title="컬럼 관리"
          getValue={setModalValue}
          onCancelClick={() => {
            console.log('취소');
            setIsOpen({ ...isOpen, setting: false });
          }}
          onOkClick={async () => {
            console.log('확인');
            console.log({ ...isOpen, setting: false }); // 모달 input value 출력
            console.log(manageColumnVal);
            handleManageColumnSubmit();
            // TODO: api status == 200 인지 확인하고 닫아야함
            setIsOpen({ ...isOpen, setting: false });
            // await getCardListFunc();
          }}
          onDeleteClick={() => {
            handleColumnDelete();
          }}
        />
      )}
      <StyledHeader>
        <div>{title}</div>
        <StyledCountChip content={totalCount} />
      </StyledHeader>
      <StyledWrapper>
        <AddButton onClick={handleClickCreate} />
        {isOpen.create && (
          <Modal
            title="할 일 생성"
            getValue={setModalValue2}
            onCancelClick={() => {
              setIsOpen({ ...isOpen, create: false });
            }}
            onOkClick={() => {
              console.log(createToDoVal); // 모달 input value 출력
              handleCreateToDoSubmit();
              // createToDoFunc();
            }}
            // onDeleteClick={() => {
            //   console.log('삭제');
            // }}
          />
        )}
        {cards.map((card) => (
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
    </StyledContainer>
  );
}

export default Column;

const StyledContainer = styled.div`
  width: 19.25rem;
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
    padding: 20px;
    width: 100%;
  }

  ${onPc} {
    width: 354px;
    padding: 1.25rem;
    border: none;
    border-right: 0.0625rem solid ${COLORS.GRAY_EE};
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
