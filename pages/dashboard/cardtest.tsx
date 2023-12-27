import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';


import styled from 'styled-components';
import ColumnAddButton from '@/components/common/Button/ColumnAddButton';
import Column from '@/components/Card/Column';
import { onPc, onTablet } from '@/styles/mediaQuery';

function CardTest() {
  const [isSuccess, setIsSuccess] = useState(true);
  // const [columns, setColumns] = useState([]);
  const router = useRouter();

  // 컬럼 목록 조회 데이터 불러오기
  // result가 success 이면 
    // setIsSuccess((prev) => !prev)
    // setColumns에 data 넣기
  // 아니면 NotFound 페이지 이동 

  // 카드 목록 조회

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push('/boardid');
  };

  return (
    <StyledContainer>
      {isSuccess && (
        <StyledWrapper>
          {/* {columns.map((column) => (
            <li key={column.id}>
              <Column
                title={column.title}
                id={column.id}
              />
            </li>
          ))} */}
          <Column />
        </StyledWrapper>
      )}
      <StyledWrapper2>
        <ColumnAddButton onClick={handleClick}/>
      </StyledWrapper2>
    </StyledContainer>
  );
}

export default CardTest;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${onPc} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${onPc} {
    flex-direction: row;
  }
`;

const StyledWrapper2 = styled.div`
  padding: 12px 0 12px;

  ${onTablet} {
    padding: 20px 0 20px;
  }

  ${onPc} {
    padding: 68px 0 0 20px;
  }
`;
