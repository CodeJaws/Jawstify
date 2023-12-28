import React, { useEffect } from 'react';
import { useState } from 'react';
import router, { useRouter } from 'next/router';
import styled from 'styled-components';
import ColumnAddButton from '@/components/common/Button/ColumnAddButton';
import Column from '@/components/Columns/Column';
import { onPc, onTablet } from '@/styles/mediaQuery';
import API from '@/apis/api';
import { GetColumnListProps } from '@/types/api';
import Modal from '../Modal/Modal';

interface ColumnProps {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

function Columns({ dashboardId }: GetColumnListProps) {
  const [isSuccess, setIsSuccess] = useState('');
  const [columns, setColumns] = useState<ColumnProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({});

  const setModalValue = (values = {}) => {
    setValue(values); 
  };

  // 컬럼 목록 조회
  const getColumnListFunc = async (dashboardId: number) => {
    const res = await API.columns.getColumnList({ dashboardId });
    const columns = res?.data;
    const isSuccess = res?.result;
    setIsSuccess(isSuccess);
    setColumns(columns);
  }

  useEffect(() => {
    getColumnListFunc(dashboardId);
    getColumnListFunc(408);
  }, [dashboardId]);

  const handleClickCreateModal = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <StyledContainer>
      {isSuccess === 'SUCCESS' && (
        <StyledWrapper>
          {columns.map((column) => (
            <li key={column.id}>
              <Column
                title={column.title}
                columnId={column.id}
              />
            </li>
          ))}
        </StyledWrapper>
      )}
      <StyledWrapper2>
        <ColumnAddButton onClick={handleClickCreateModal}/>
        {isOpen && <Modal
          title="새 컬럼 생성"
          getValue={setModalValue}
          onCancelClick={() => {
            console.log('취소');
            setIsOpen(false);
          }}
          onOkClick={() => {
            console.log('확인');
            console.log(value); // 모달 input value 출력
          }}
          onDeleteClick={() => {
            console.log('삭제');
          }}
        />}
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
