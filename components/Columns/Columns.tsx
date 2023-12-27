import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ColumnAddButton from '@/components/common/Button/ColumnAddButton';
import Column from '@/components/Columns/Column';
import { onPc, onTablet } from '@/styles/mediaQuery';
import API from '@/apis/api';

interface ColumnProps {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

function Columns() {
  const [isSuccess, setIsSuccess] = useState('');
  const [columns, setColumns] = useState<ColumnProps[]>([]);
  const router = useRouter();

  // 컬럼 목록 조회
  const getColumnListFunc = async (dashboardId: number) => {
    const res = await API.columns.getColumnList({ dashboardId });
    const columns = res?.data;
    const isSuccess = res?.result;
    setIsSuccess(isSuccess);
    setColumns(columns);
  }

  useEffect(() => {
    getColumnListFunc(289); // 임시
  }, []);


  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push('/boardid');
  };

  return (
    <StyledContainer>
      {isSuccess === 'SUCCESS' && (
        <StyledWrapper>
          {columns.map((column) => (
            <li key={column.id}>
              <Column />
            </li>
          ))}
        </StyledWrapper>
      )}
      <StyledWrapper2>
        <ColumnAddButton onClick={handleClick}/>
      </StyledWrapper2>
    </StyledContainer>
  );
}

export default Columns;

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
