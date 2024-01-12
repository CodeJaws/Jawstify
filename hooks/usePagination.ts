import API from '@/apis/api';
import { DashboardType, InvitationType, MemberType } from '@/types/apiType';
import { useCallback, useEffect, useState } from 'react';

type AllItemTypes = DashboardType[] | MemberType[] | InvitationType[];

interface usePaginationProps {
  size: number;
  showItemNum: 4 | 5;
  type: 'dashboard' | 'members' | 'invitationDetails';
  dashboardId?: number;
  refreshPaginationToggle?: boolean;
  resetToFirst?: boolean;
  inviteRefresh?: boolean;
}

interface usePaginationReturn {
  handlePagination: (val: number) => void;
  pageNum: number;
  totalPages: number;
  allItems: AllItemTypes;
}

/**
 * @param size API에서 한번에 받아올 구성원 수 - API 요청 시 사용
 * @param showItemNum 한 화면에서 보여줄 Item 수
 * @param type 어디서 페이지네이션 사용하는지 확인할 type
 * @param dashboardId 대시보드 멤버 목록 조회 API에서 사용
 */
const usePagination = ({
  size,
  showItemNum,
  type,
  dashboardId,
  refreshPaginationToggle,
  resetToFirst,
  inviteRefresh,
}: usePaginationProps): usePaginationReturn => {
  const [pageNum, setPageNum] = useState(1);
  const [allItems, setAllItems] = useState<AllItemTypes>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalCount / showItemNum); // 총 페이지 수

  const [checkRefresh, setCheckRefresh] = useState(true);
  const [checkInviteRefresh, setCheckInviteRefresh] = useState(false);

  const handlePagination = async (num: number) => {
    if (loading) return;
    if ((pageNum + num - 1) * showItemNum > totalCount) return; // 전체 아이템 수 이상을 받아오려는 경우
    if (pageNum + num < 1 || pageNum + num > totalPages) return; // 처음에서 <, 마지막 페이지에서 > 버튼을 클릭 하는 경우

    if (Math.min(totalCount, (pageNum + num) * showItemNum) > allItems.length) {
      setLoading(true);
      if (type === 'dashboard') {
        const res = await API.dashboard.getDashboardList({
          navigationMethod: 'pagination',
          page: Math.max(1, Math.ceil((pageNum + num) / (size / showItemNum))),
        });
        setAllItems((prev) => [...prev, ...res.dashboards] as DashboardType[]);
        setTotalCount(res.totalCount);
      } else if (type === 'members') {
        const res = await API.members.getMembersInDashboard({
          size,
          page: Math.max(1, Math.ceil((pageNum + num) / (size / showItemNum))),
          dashboardId: Number(dashboardId),
        });
        setAllItems((prev) => [...prev, ...res.members] as MemberType[]);
        setTotalCount(res.totalCount);
      } else if (type === 'invitationDetails') {
        const res = await API.dashboard.loadInviteDashboard({
          dashboardId: Number(dashboardId),
          page: Math.max(1, Math.ceil((pageNum + num) / (size / showItemNum))),
          size,
        });
        setAllItems((prev) => [...prev, ...res.invitations] as InvitationType[]);
        setTotalCount(res.totalCount);
      }
      setLoading(false);
    }
    setPageNum((prev) => prev + num);
    return;
  };

  const firstFetch = useCallback(async () => {
    setLoading(true);
    let fetchedItems: AllItemTypes = [];
    if (type === 'dashboard') {
      const res = await API.dashboard.getDashboardList({
        navigationMethod: 'pagination',
        page: 1,
        size,
      });
      fetchedItems = res.dashboards;
      setTotalCount(res.totalCount);
    } else if (type === 'members') {
      const res = await API.members.getMembersInDashboard({ size, page: 1, dashboardId: Number(dashboardId) });
      fetchedItems = res.members;
      setTotalCount(res.totalCount);
    } else if (type === 'invitationDetails') {
      const res = await API.dashboard.loadInviteDashboard({ dashboardId: Number(dashboardId), page: 1, size });
      fetchedItems = res.invitations;
      setTotalCount(res.totalCount);
    }
    setAllItems(fetchedItems);
    setLoading(false);
  }, [type, size, showItemNum, dashboardId, allItems]);

  useEffect(() => {
    if (refreshPaginationToggle !== checkRefresh || inviteRefresh !== checkInviteRefresh) {
      firstFetch();
    }
    setCheckRefresh(refreshPaginationToggle as boolean);
    setCheckInviteRefresh(inviteRefresh as boolean);
  }, [refreshPaginationToggle, firstFetch, checkRefresh, inviteRefresh]);

  useEffect(() => {
    firstFetch();
    setPageNum(1);
  }, [resetToFirst]);

  return { handlePagination, pageNum, totalPages, allItems };
};

export default usePagination;
