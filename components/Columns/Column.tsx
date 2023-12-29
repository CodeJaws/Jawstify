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
import { CreateCardProps, GetCardDetailsItem } from '@/types/api';
import Modal from '../Modal/Modal';

interface Props {
  columnId: number;
  title: string;
}

function Column({ title, columnId }: Props) {
  const [cards, setCards] = useState<GetCardDetailsItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState({
    setting: false,
    create: false
  });
  const [value, setValue] = useState({
    담당자: '',
    제목: '',
    설명: '',
    상태: '',
    마감일: '',
    태그: {},
    이미지: '',
  });

  // 카드 목록 조회
  const getCardListFunc = async (columnId: number) => {
    const res = await API.cards.checkCardList({ columnId });
    const cards = res?.cards;
    const totalCount = res?.totalCount;
    setCards(cards);
    setTotalCount(totalCount);
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

  const setModalValue = (values: {이름: ''}) => {
    setValue(values);
  };

  const handleClickSetting = (e: React.MouseEvent<HTMLElement>) => {
    console.log('컬럼 수정 모달');
    setIsOpen({ ...isOpen, setting: true });
  };
  
  useEffect(() => {
    getCardListFunc(columnId);
  }, [columnId]);

  return (
    <StyledContainer>
      <StyledSettingIconContainer onClick={handleClickSetting}>
        <Image fill src={setting} alt="설정 버튼" />
      </StyledSettingIconContainer>
      {isOpen.setting && <Modal title="컬럼 관리" 
        getValue={setValue({...value, })}
        onCancelClick={() => {
          console.log('취소');
          setIsOpen({ ...isOpen, setting: false });
        }}
        onOkClick={() => {
          console.log('확인');
          console.log({ ...isOpen, setting: false }); // 모달 input value 출력
          // createToDoFunc(value);
        }}
        onDeleteClick={() => {
          console.log('삭제');
        }}
      />}  
      <StyledHeader>
        <div>{title}</div>
        <StyledCountChip content={totalCount}/>
      </StyledHeader>
      <StyledWrapper>
        <AddButton onClick={handleClickCreate} />
        {isOpen.create && <Modal
          title='할 일 생성'
          getValue={setModalValue}
          onCancelClick={() => {
            setIsOpen({ ...isOpen, create: false });
          }}
          onOkClick={() => {
            console.log(value); // 모달 input value 출력
            // createToDoFunc();
          }}
          // onDeleteClick={() => {
          //   console.log('삭제');
          // }}
        />}
        {cards.map((card) => (
          <li key={card.id}>
            <Card 
                title={card.title} 
                dueDate={card.dueDate}
                tags={card.tags}
                assignee={card.assignee}
                imageUrl={card.imageUrl}/>
          </li>
        ))}
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Column;

const StyledContainer = styled.div`
  width: 308px;
  height: auto;
  padding: 12px;
  position: relative;
  border-bottom: 1px solid ${COLORS.GRAY_EE};

  ${onTablet} {
    width: 584px;
    padding: 20px;
  }

  ${onPc} {
    width: 354px;
    padding: 20px;
    border: none;
    border-right: 1px solid ${COLORS.GRAY_EE};
  }
`;

const StyledSettingIconContainer = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 20px;
  top: 20px;
  cursor: pointer;

  ${onMobile} {
    width: 22px;
    height: 22px;
    right: 12px;
    top: 12px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  gap: 12px;
  ${fontStyle(18, 700)};
  margin-bottom: 25px;

  ${onMobile} {
    ${fontStyle(16, 700)};
    margin-bottom: 17px;
  }
`;

const StyledCountChip = styled(CountChip)`
  width: 20px;
  height: 20px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${onMobile} {
    gap: 10px;
  }
`;
