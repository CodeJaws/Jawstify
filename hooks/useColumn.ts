import api from '@/apis/api';
import API from '@/apis/api';
import { ColumnProps } from '@/components/Columns/Column';
import { INIT_MANAGE_COLUMN } from '@/constants/InitialModalValues';
import { GetCardDetailsItem } from '@/types/api';
import { useState } from 'react';

function useColumns({ title: defaultTitle, columnId, dashboardId, applyColumnDelete }: ColumnProps) {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState({
    manageColumn: false,
    createToDo: false,
  });
  const [cardListInfos, setCardListInfos] = useState({
    title: defaultTitle,
    totalCount: 0,
    cursorId: 0,
  });
  const [columnCardList, setColumnCardList] = useState<GetCardDetailsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [manageColModalVals, setManageColModalVals] = useState<typeof INIT_MANAGE_COLUMN>(INIT_MANAGE_COLUMN);

  // 모달 open 여부 관리
  const handleColumnModalsOpen = (type: 'manageColumn' | 'createToDo') => {
    if (type === 'manageColumn') {
      setIsColumnModalOpen({ ...isColumnModalOpen, manageColumn: true });
    } else if (type === 'createToDo') {
      setIsColumnModalOpen({ ...isColumnModalOpen, createToDo: true });
    }
  };

  // 무한스크롤로 카드 리스트 가져오기
  const fetchMoreCards = () => {
    if (cardListInfos.cursorId !== 0) {
      loadColumCardList();
    } else {
      setHasMore(false);
    }
  };

  // 대시보드 첫 실행시 처음 보여지는 데이터 불러오기 (with no cursor Id)
  const firstColumnDataFetch = async () => {
    const res = await API.cards.checkCardList({ columnId, size: 14 });
    setColumnCardList(res.cards);
    setCardListInfos({ ...cardListInfos, totalCount: res.totalCount, cursorId: Number(res.cursorId) });
  };

  // 무한 스크롤 시 추가로 카드 데이터 가져오기 (with prior saved cursor Id )
  const loadColumCardList = async () => {
    const res = await API.cards.checkCardList({ columnId, cursorId: cardListInfos.cursorId, size: 10 });
    setColumnCardList((prev) => [...prev, ...res.cards]);
    setCardListInfos({ ...cardListInfos, totalCount: res.totalCount, cursorId: Number(res.cursorId) });
  };

  // 컬럼 삭제
  const handleColumnDelete = async () => {
    if (window.confirm(`${cardListInfos.title} 컬럼을 정말 삭제하시겠습니까?`)) {
      const res = await api.columns.deleteColumn({ columnId: columnId });
      await applyColumnDelete(dashboardId);
    }
    return;
  };

  // 컬럼 수정
  const handleManageColumnSubmit = async () => {
    const response = (await api.columns.correctColumn({
      columnId: Number(columnId),
      title: manageColModalVals.이름,
    })) as { title: '' };
    setCardListInfos({ ...cardListInfos, title: response.title });
  };

  return {
    isColumnModalOpen,
    setIsColumnModalOpen,
    handleColumnModalsOpen,
    cardListInfos,
    columnCardList,
    hasMore,
    fetchMoreCards,
    firstColumnDataFetch,
    handleColumnDelete,
    handleManageColumnSubmit,
    setManageColModalVals,
  };
}
export default useColumns;
