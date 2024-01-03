import API from '@/apis/api';
import ModalCard from '@/components/ModalCard/ModalCard';
import useGetMember from '@/hooks/DropDown/useGetMember';
import useCardData from '@/hooks/ModalCard/useCardData';
import useCardId from '@/hooks/ModalCard/useCardId';
import useDashBoard from '@/hooks/ModalCard/useDashBoard';
import useRedirectByDashboardId from '@/hooks/useRedirectByDashboardId';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import useRefresh from '@/hooks/useRefresh';
import { GetServerSidePropsContext } from 'next';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

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
  useRedirectByLogin();
  useRedirectByDashboardId({ dashboardId });

  const { setCardData } = useCardData();
  const { setTasks } = useDashBoard();
  const { setMembers } = useGetMember();
  const { setCardId } = useCardId();
  const { refresh } = useRefresh();

  const params = useSearchParams();
  const cardId = params.get('cardId') as unknown as number;

  const testAPI = useCallback(async () => {
    const getCards = await API.cards.getCardDetails({ cardId });

    const dashBoard = await API.columns.getColumnList({ dashboardId });
    const getMember = await API.members.getMembersInDashboard({ dashboardId });

    setCardData(getCards);

    setCardId(Number(cardId));
    setTasks(dashBoard);
    setMembers(getMember);
  }, [cardId, dashboardId, setCardData, setCardId, setMembers, setTasks]);

  useEffect(() => {
    testAPI();
  }, [refresh, testAPI]);

  return <ModalCard />;
}

export default BoardID;
