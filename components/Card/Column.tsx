import Image from 'next/image';
import styled from 'styled-components';
import setting from '@/public/assets/icons/setting.svg';
import { onMobile, onTablet, onPc } from '@/styles/mediaQuery';
import CountChip from '../Chip/CountChip';
import { fontStyle } from '@/styles/fontStyle';
import AddButton from '../common/Button/AddButton';
import Card from './Card';
import { COLORS } from '@/styles/palettes';
import React from 'react';
import { useState } from 'react';

function Column() {
  // const [data, setData] = useState();
  // const { totalCount, cards } = data;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // 할일 생성 모달 
    e.preventDefault();
    console.log('할일 생성 모달');
  }

  const handlsClickSetting = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    // 컬럼 수정 모달
    console.log('컬럼 수정 모달');
  }

  return (
    <StyledContainer>
      <StyledSettingIconContainer onClick={handlsClickSetting}>
        <Image fill src={setting} alt='설정' />
      </StyledSettingIconContainer>
      <StyledHeader>
        <div>Todo</div>
        <StyledCountChip content='2' />
      </StyledHeader>
      <StyledWrapper>
        <AddButton onClick={handleClick}/>
        {/* {cards.map((card) => (
          <li key={card.id}>
            <Card
              title={card.title}
              tags={card.tags}
              dueDate={card.dueDate}
              assignee={card.assignee}
              imageUrl={card.imageUrl}
            />
          </li>
        ))} */}
        <Card />
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
`

const StyledSettingIconContainer = styled.div`
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
