import ModalCard from '@/components/ModalCard/ModalCard';
import useRedirectByDashboardId from '@/hooks/useRedirectByDashboardId';
import useRedriectByLogin from '@/hooks/useRedriectByLogin';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const dashboardId = context?.params['dashboardid'];
  return {
    props: {
      dashboardId,
    },
  };
}
interface DashboardEditPageProps {
  dashboardId: number;
}

function BoardID({ dashboardId }: DashboardEditPageProps) {
  useRedriectByLogin();
  useRedirectByDashboardId({ dashboardId });

  return <ModalCard />;
}

export default BoardID;
