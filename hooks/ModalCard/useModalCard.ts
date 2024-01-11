import API from '@/apis/api';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardId from '@/hooks/ModalCard/useCardId';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import useDeviceType from '@/hooks/useDeviceType';
import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

function useModalCard() {
  const { setStatus } = useSelectStatus();
  const { cardId } = useCardId();
  const { dashboardId } = useDashBoardId();
  const deviceType = useDeviceType();

  const { data: cardData } = useQuery({
    queryKey: ['card', cardId],
    queryFn: async () => {
      return await API.cards.getCardDetails({ cardId });
    },
    enabled: !!cardId,
  });
  const { data: dashBoard } = useQuery({
    queryKey: ['dashBoard', dashboardId],
    queryFn: async () => {
      return await API.columns.getColumnList({ dashboardId });
    },
    enabled: !!dashboardId,
  });
  const { data: member } = useQuery({
    queryKey: ['member'],
    queryFn: async () => {
      return await API.members.getMembersInDashboard({ dashboardId });
    },
    enabled: !!dashboardId,
  });

  const filterColumn = dashBoard?.data.filter((val) => val.id === cardData?.columnId);
  const status = filterColumn ? filterColumn[0]?.title : '';

  useEffect(() => {
    setStatus(status);
  }, [setStatus, status]);

  return { deviceType, cardData, status };
}

export default useModalCard;
