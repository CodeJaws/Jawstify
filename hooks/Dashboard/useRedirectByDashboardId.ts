import API from '@/apis/api';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface useRedirectByDashboardIdProps {
  dashboardId: number;
}

const useRedirectByDashboardId = ({ dashboardId }: useRedirectByDashboardIdProps) => {
  const router = useRouter();

  const IsDashboardMember = async () => {
    try {
      await API.dashboard.getDashboardDetailed({ dashboardId });
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!(await IsDashboardMember())) {
        alert('해당 대시보드의 멤버가 아닙니다!');
        router.push('/mydashboard');
      }
    };

    if (dashboardId) {
      fetchData();
    }
  }, [router]);
};

export default useRedirectByDashboardId;
