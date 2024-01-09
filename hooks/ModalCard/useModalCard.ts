import API from '@/apis/api';
import useGetMember from '@/hooks/DropDown/useGetMember';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardData from '@/hooks/ModalCard/useCardData';
import useCardId from '@/hooks/ModalCard/useCardId';
import useDashBoard from '@/hooks/ModalCard/useDashBoard';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import useDeviceType from '@/hooks/useDeviceType';
import useRefresh from '@/hooks/useRefresh';

import { useCallback, useEffect } from 'react';

function useModalCard() {
  const { cardData, setCardData } = useCardData();
  const { setTasks } = useDashBoard();
  const { setMembers } = useGetMember();
  const { setStatus } = useSelectStatus();
  const { cardId, setCardId } = useCardId();
  const { dashboardId } = useDashBoardId();
  const { refresh } = useRefresh();
  const { tasks } = useDashBoard();
  const deviceType = useDeviceType();

  const getDetailCardData = useCallback(async () => {
    const getCards = await API.cards.getCardDetails({ cardId });
    const dashBoard = await API.columns.getColumnList({ dashboardId });
    const getMember = await API.members.getMembersInDashboard({ dashboardId });

    setCardData(getCards);
    setCardId(Number(cardId));
    setTasks(dashBoard);
    setMembers(getMember);
  }, [cardId, dashboardId, setCardData, setCardId, setMembers, setTasks]);

  const { title, description, imageUrl } = cardData;

  const filterColumn = tasks.data.filter((val) => val.id === cardData.columnId);
  const status = filterColumn[0].title;

  useEffect(() => {
    getDetailCardData();
  }, [refresh, getDetailCardData]);

  useEffect(() => {
    setStatus(status);
  }, [setStatus, status]);

  return { deviceType, title, cardData, description, imageUrl, status };
}

export default useModalCard;
