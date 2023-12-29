import API from '@/apis/api';
import { useEffect, useState } from 'react';
import { GetDashboardDetailedItem, GetMembersInDashboardItem } from '@/types/api';

type MemberType = GetMembersInDashboardItem['members'][0];

interface useDashboardProps {
  dashboardId: number;
  refreshToggle?: boolean;
}

const useDashboard = ({ dashboardId, refreshToggle }: useDashboardProps) => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [dashboardData, setDashboardData] = useState<GetDashboardDetailedItem>({
    id: 0,
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    createdByMe: false,
    userId: 0,
  });

  const dashboardFetch = async () => {
    try {
      const dashboardDetailedData = await API.dashboard.getDashboardDetailed({ dashboardId: Number(dashboardId) }); // 현제 대시보드의 상세 정보
      const membersInDashboardData = await API.members.getMembersInDashboard({ dashboardId: Number(dashboardId) }); // 대시보드 멤버들의 정보
      setMembers(membersInDashboardData.members);
      setTotalMembers(membersInDashboardData.totalCount);
      setDashboardData(dashboardDetailedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dashboardFetch();
  }, [dashboardId]);

  return { totalMembers, members, dashboardData };
};

export default useDashboard;
