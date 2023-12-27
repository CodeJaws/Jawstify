import API from '@/apis/api';
import { localStorageSetItem } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import useUserData from './global/useUserData';
import { GetDashboardDetailedItem, GetMembersInDashboardItem } from '@/types/api';

type MemberType = GetMembersInDashboardItem['members'][0];

const useDashboard = () => {
  const { setUser } = useUserData();
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
    // 로그인
    const loginData = await API.auth.login({ email: 'test10@codeit.com', password: 'test12345' });
    localStorageSetItem('accessToken', loginData.accessToken);
    setUser(loginData.user);

    const dashboardDetailedData = await API.dashboard.getDashboardDetailed({ dashboardId: String(248) }); // 현제 대시보드의 상세 정보
    const membersInDashboardData = await API.members.getMembersInDashboard({ dashboardId: 248 }); // 대시보드 멤버들의 정보
    setMembers(membersInDashboardData.members);
    setTotalMembers(membersInDashboardData.totalCount);
    setDashboardData(dashboardDetailedData);
  };

  useEffect(() => {
    dashboardFetch();
  }, []);

  return { totalMembers, members, dashboardData };
};

export default useDashboard;
