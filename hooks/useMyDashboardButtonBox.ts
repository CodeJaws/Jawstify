import API from '@/apis/api';
import { MyDashBoardButtonBoxProps } from '@/components/MyDashboard/MyDashBoardButtonBox';
import { INIT_CREATE_DASHBOARD } from '@/constants/InitialModalValues';
import { DashboardType } from '@/types/apiType';
import { useState } from 'react';
import usePagination from './usePagination';

interface usePaginationProps {
  handlePagination: (val: number) => void;
  pageNum: number;
  allItems: DashboardType[];
  totalPages: number;
}

const LIMIT = 5;

function useMyDashBoardButtonBox({ resetToFirst, refresh, refreshPaginationToggle }: MyDashBoardButtonBoxProps) {
  const { handlePagination, pageNum, allItems, totalPages } = usePagination({
    size: 10,
    showItemNum: LIMIT,
    type: 'dashboard',
    refreshPaginationToggle,
    resetToFirst,
  }) as usePaginationProps;
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INIT_CREATE_DASHBOARD);

  const setModalValue = (values = INIT_CREATE_DASHBOARD) => {
    setValues(values); // value = modal에 입력된 input value들의 집합
  };

  const showItems = allItems.slice((pageNum - 1) * LIMIT, (pageNum - 1) * LIMIT + LIMIT);

  const handleCreate = async () => {
    try {
      await API.dashboard.createDashboard({ title: values['대시보드 이름'], color: values.색상 });
      refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return { setIsOpen, showItems, totalPages, pageNum, handlePagination, isOpen, setModalValue, handleCreate };
}

export default useMyDashBoardButtonBox;
