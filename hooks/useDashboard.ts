import { QUERY_KEYS } from '@/constants/QueryKey';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import API from '@/apis/api';
import { ApiErrorResponse } from '@/types/apiType';

interface useDashboardProps {
  dashboardId: number;
}

const useDashboard = ({ dashboardId }: useDashboardProps) => {
  const router = useRouter();

  const {
    data: dashboardData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.dashboard, dashboardId],
    queryFn: async () => {
      const dashboardDetailedData = await API.dashboard.getDashboardDetailed({ dashboardId: Number(dashboardId) });
      return dashboardDetailedData;
    },
  });

  const { data: membersInDashboardData } = useQuery({
    queryKey: [QUERY_KEYS.members, dashboardId],
    queryFn: async () => {
      const membersData = await API.members.getMembersInDashboard({ dashboardId: Number(dashboardId) });
      return membersData;
    },
  });

  if (error) {
    const apiError = error as ApiErrorResponse;
    console.log(error);
    if (
      apiError.data?.message === '대시보드의 멤버가 아닙니다.' ||
      apiError.data?.message === '대시보드가 존재하지 않습니다.'
    ) {
      alert('잘못된 접근입니다!');
      router.push('/mydashboard');
    }
  }

  return {
    totalMembers: membersInDashboardData?.totalCount || 0,
    members: membersInDashboardData?.members || [],
    dashboardData: dashboardData || {
      id: 0,
      title: '',
      color: '',
      createdAt: '',
      updatedAt: '',
      createdByMe: false,
      userId: 0,
    },
    isLoading,
  };
};

export default useDashboard;
