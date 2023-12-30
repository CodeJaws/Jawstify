import API from '@/apis/api';
import { useEffect, useState } from 'react';
import { GetDashboardDetailedItem, GetMembersInDashboardItem } from '@/types/api';
import { useRouter } from 'next/router';

type MemberType = GetMembersInDashboardItem['members'][0];

interface useDashboardProps {
  dashboardId: number;
  refreshToggle?: boolean;
}

const useDashboard = ({ dashboardId, refreshToggle }: useDashboardProps) => {
  const router = useRouter();
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
    } catch (e: any) {
      console.log(e);
      if (e.data.message === '대시보드의 멤버가 아닙니다.' || e.data.message === '대시보드가 존재하지 않습니다.') {
        alert('잘못된 접근입니다!');
        router.push('/mydashboard');
      }
    }
  };

  useEffect(() => {
    dashboardFetch();
  }, [dashboardId, refreshToggle]);

  return { totalMembers, members, dashboardData };
};

export default useDashboard;
