import API from '@/apis/api';
import ModalCard from '@/components/ModalCard/ModalCard';
import useGetMember from '@/hooks/DropDown/useGetMember';
import useCardData from '@/hooks/ModalCard/useCardData';
import useCardId from '@/hooks/ModalCard/useCardId';
import useDashBoard from '@/hooks/ModalCard/useDashBoard';
import useRefresh from '@/hooks/useRefresh';
import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

const cardId = 328;

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
  const { setCardData } = useCardData();
  const { setCardId } = useCardId();
  const { setTasks } = useDashBoard();
  const { setMembers } = useGetMember();
  const { refresh } = useRefresh();

  const testAPI = async () => {
    const test = await API.cards.getCardDetails({ cardId });

    const dashBoard = await API.columns.getColumnList({ dashboardId });
    const getMember = await API.members.getMembersInDashboard({ dashboardId });

    setCardData(test);

    setCardId(cardId);
    setTasks(dashBoard);
    setMembers(getMember);
  };

  useEffect(() => {
    testAPI();
  }, [refresh]);

  return <ModalCard />;
}

export default BoardID;
