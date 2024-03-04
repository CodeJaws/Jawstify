import { useCallback, useEffect, useState } from 'react';

import { useGetDashboardList, useLoadInviteDashboard } from '@/apis/queries/dashboard';
import { useGetMembersInDashboard } from '@/apis/queries/members';
import { GetDashboardListItem, GetMembersInDashboardItem, LoadInviteDashboardItem } from '@/types/api';
import { DashboardType, InvitationType, MemberType } from '@/types/apiType';

type AllItemTypes = DashboardType[] | MemberType[] | InvitationType[];

interface usePaginationProps {
  size: number;
  type: 'dashboard' | 'members' | 'invitationDetails';
  dashboardId?: number;
  resetToFirst?: boolean;
}

interface usePaginationReturn {
  handlePageNum: (val: number) => void;
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
const usePagination = ({ size, type, dashboardId }: usePaginationProps): usePaginationReturn => {
  const [pageNum, setPageNum] = useState(1);
  const [allItems, setAllItems] = useState<AllItemTypes>([]);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / size); // 총 페이지 수

  const handlePageNum = async (num: number) => {
    if ((pageNum + num - 1) * size > totalCount) return; // 전체 아이템 수 이상을 받아오려는 경우
    if (pageNum + num < 1 || pageNum + num > totalPages) return; // 처음에서 <, 마지막 페이지에서 > 버튼을 클릭 하는 경우
    setPageNum((prev) => prev + num);
  };

  const {
    data: memberData,
    error: memberError,
    isLoading: isMemberLoading,
  } = useGetMembersInDashboard({
    size,
    page: pageNum,
    dashboardId: Number(dashboardId),
  });

  const {
    data: inviteData,
    error: inviteError,
    isLoading: isInviteLoading,
  } = useLoadInviteDashboard({
    dashboardId: Number(dashboardId),
    page: pageNum,
    size,
  });

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: isDashboardError,
  } = useGetDashboardList({
    navigationMethod: 'pagination',
    page: pageNum,
    size: 5,
  });

  const memberFetch = useCallback((memberData: GetMembersInDashboardItem) => {
    setAllItems(memberData.members as MemberType[]);
    setTotalCount(memberData.totalCount);
  }, []);

  const inviteFetch = useCallback((inviteData: LoadInviteDashboardItem) => {
    setAllItems(inviteData.invitations as InvitationType[]);
    setTotalCount(inviteData.totalCount);
  }, []);

  const dashboardFetch = useCallback((dashboardData: GetDashboardListItem) => {
    setAllItems(dashboardData.dashboards as DashboardType[]);
    setTotalCount(dashboardData.totalCount);
  }, []);

  useEffect(() => {
    if (isMemberLoading || isInviteLoading || isDashboardError) return;

    // 첫 렌더링 fetch
    if (allItems.length === 0) {
      if (type === 'members') memberFetch(memberData!);
      else if (type === 'invitationDetails') inviteFetch(inviteData!);
      else if (type === 'dashboard') dashboardFetch(dashboardData!);
    } else {
      if (type === 'members' && memberData) memberFetch(memberData);
      else if (type === 'invitationDetails' && inviteData) inviteFetch(inviteData);
      else if (type === 'dashboard' && dashboardData) dashboardFetch(dashboardData);
    }
  }, [memberData, inviteData, dashboardData]);

  return { handlePageNum, pageNum, totalPages, allItems };
};

export default usePagination;
