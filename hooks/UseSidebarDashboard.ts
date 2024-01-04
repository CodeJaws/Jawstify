import API from '@/apis/api';
import { DashboardProps } from '@/components/Sidebar/Dashboard';
import { reset } from '@/styles/reset';
import { DashboardType } from '@/types/apiType';
import { useEffect, useRef, useState } from 'react';

function useSidebarDashboard({ refreshToggle, refresh }: DashboardProps) {
  const [dataSource, setDataSource] = useState<DashboardType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [dashboardPage, setDashboardPage] = useState(2);
  const [totlaCount, setTotalCount] = useState(0);
  const dashboardContainerRef = useRef<HTMLDivElement>(null);

  const getItems = async () => {
    const item = await API.dashboard.getDashboardList({ navigationMethod: 'infiniteScroll', size: 18 });
    setDataSource(item.dashboards);
    setTotalCount(item.totalCount);
  };

  const fetchHasMore = () => {
    if (dataSource.length < totlaCount) {
      if (dataSource.length !== 0) {
        handleLoadMore(dashboardPage);
      }
    } else {
      setHasMore((prev) => !prev);
    }
  };

  const handleLoadMore = async (dashboardPage: number) => {
    const item = await API.dashboard.getDashboardList({
      navigationMethod: 'pagination',
      page: dashboardPage,
      size: 18,
    });
    setDataSource((prev) => [...prev, ...item.dashboards]);
    setDashboardPage((prev) => prev + 1);
  };

  useEffect(() => {
    getItems();
    if (dashboardContainerRef.current) {
      dashboardContainerRef.current.scrollTop = 0;
      if (hasMore === false) {
        setDashboardPage(2);
        setHasMore((prev) => !prev);
      }
    }
  }, [reset, refreshToggle, refresh]);
  return { dashboardContainerRef, fetchHasMore, hasMore, dataSource };
}

export default useSidebarDashboard;
