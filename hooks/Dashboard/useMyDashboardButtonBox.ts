import API from '@/apis/api';
import { MyDashBoardButtonBoxProps } from '@/components/MyDashboard/MyDashBoardButtonBox';
import { INIT_CREATE_DASHBOARD } from '@/constants/InitialModalValues';
import usePagination from '@/hooks/Common/usePagination';
import { DashboardType } from '@/types/apiType';

import { useState } from 'react';

interface usePaginationProps {
  handlePageNum: (val: number) => void;
  pageNum: number;
  allItems: DashboardType[];
  totalPages: number;
}

const LIMIT = 5;

function useMyDashBoardButtonBox({ resetToFirst }: MyDashBoardButtonBoxProps) {
  const { handlePageNum, pageNum, allItems, totalPages } = usePagination({
    size: LIMIT,
    type: 'dashboard',
    resetToFirst,
  }) as usePaginationProps;
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INIT_CREATE_DASHBOARD);

  const setModalValue = (values = INIT_CREATE_DASHBOARD) => {
    setValues(values); // value = modal에 입력된 input value들의 집합
  };

  const handleCreate = async () => {
    try {
      await API.dashboard.createDashboard({ title: values['대시보드 이름'], color: values.색상 });
    } catch (error) {
      console.error(error);
    }
  };
  return { setIsOpen, allItems, totalPages, pageNum, handlePageNum, isOpen, setModalValue, handleCreate };
}

export default useMyDashBoardButtonBox;
