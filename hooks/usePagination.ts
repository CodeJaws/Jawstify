import API from '@/apis/api';
import { DashboardType, InvitationType, MemberType } from '@/types/apiType';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

type AllItemTypes = DashboardType[] | MemberType[] | InvitationType[];

interface usePaginationProps {
  size: number;
  showItemNum: 4 | 5;
  type: 'dashboard' | 'members' | 'invitationDetails';
  dashboardId?: number;
  reset: boolean;
}

interface usePaginationReturn {
  handlePagination: (val: number) => void;
  showItems: AllItemTypes;
  pageNum: number;
  totalPages: number;
}

/**
 * @param size API에서 한번에 받아올 구성원 수 - API 요청 시 사용
 * @param showItemNum 한 화면에서 보여줄 Item 수
 * @param type 어디서 페이지네이션 사용하는지 확인할 type
 * @param dashboardId 대시보드 멤버 목록 조회 API에서 사용
 */
const usePagination = ({ size, showItemNum, type, dashboardId, reset }: usePaginationProps): usePaginationReturn => {
  const [pageNum, setPageNum] = useState(1);
  const [allItems, setAllItems] = useState<AllItemTypes>([]);
  const [showItems, setShowItems] = useState<AllItemTypes>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalCount / showItemNum); // 총 페이지 수

  const handlePagination = async (num: number) => {
    if (loading) return;
    if ((pageNum + num - 1) * showItemNum > totalCount) return; // 전체 아이템 수 이상을 받아오려는 경우
    if (pageNum + num < 1 || pageNum + num > totalPages) return; // 처음에서 <, 마지막 페이지에서 > 버튼을 클릭 하는 경우

    if (Math.min(totalCount, (pageNum + num) * showItemNum) > allItems.length) {
      setLoading(true);
      const res = await API.dashboard.getDashboardList({
        navigationMethod: 'pagination',
        page: Math.max(1, Math.ceil((pageNum + num) / (size / showItemNum))),
      });
      console.log(res);
      setLoading(false);

      if (type === 'members') {
        setAllItems((prev) => [...prev, ...res.dashboards] as MemberType[]);
      } else if (type === 'invitationDetails') {
        setAllItems((prev) => [...prev, ...res.dashboards] as InvitationType[]);
      } else if (type === 'dashboard') {
        setAllItems((prev) => [...prev, ...res.dashboards] as DashboardType[]);
      }
    }
    setPageNum((prev) => prev + num);
    return;
  };

  const firstFetch = useCallback(async () => {
    setLoading(true);
    const res = await API.dashboard.getDashboardList({
      navigationMethod: 'pagination',
      page: 1,
      size,
    });
    setTotalCount(res.totalCount); // 전체 아이템 수
    setAllItems(res.dashboards);
    setShowItems(res.dashboards.slice(0, showItemNum));
    setLoading(false);
  }, [showItemNum, size]);

  useEffect(() => {
    setShowItems(allItems.slice((pageNum - 1) * showItemNum, (pageNum - 1) * showItemNum + showItemNum));
    if (allItems.length === 0) {
      firstFetch();
    }
  }, [allItems, pageNum, showItemNum, firstFetch]);

  useLayoutEffect(() => {
    setAllItems([]);
    setPageNum(1);
  }, [reset]);

  return { handlePagination, pageNum, showItems, totalPages };
};

export default usePagination;
