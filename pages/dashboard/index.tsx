import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useRouter } from 'next/router';

function DashBoardID() {
  const router = useRouter();
  const { dashboardid: id } = router.query;

  return (
    <>
      <Sidebar />
      <DashboardNavbar isMyDashboard={false} isOwner={true} title='비브리지' />
    </>
  );
}

export default DashBoardID;
