import { useGetCardDetails } from '@/apis/queries/cards';
import { useGetColumnList } from '@/apis/queries/columns';
import { useGetMembersInDashboard } from '@/apis/queries/members';
import useDeviceType from '@/hooks/Common/useDeviceType';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';

import { useEffect } from 'react';
import useDashBoardId from './useDashBoardId';

function useModalCard() {
  const { setStatus } = useSelectStatus();
  const { dashboardId } = useDashBoardId();

  const deviceType = useDeviceType();

  const { cardData } = useGetCardDetails();
  const { dashBoard } = useGetColumnList();
  const { data } = useGetMembersInDashboard({ dashboardId });

  const filterColumn = dashBoard?.data.filter((val) => val.id === cardData?.columnId);
  const status = filterColumn ? filterColumn[0]?.title : '';

  useEffect(() => {
    setStatus(status);
  }, [setStatus, status]);

  return { deviceType, cardData, status };
}

export default useModalCard;
