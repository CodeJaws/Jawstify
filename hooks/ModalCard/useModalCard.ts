import { useGetCardDetails } from '@/apis/queries/cards';
import { useGetColumnList } from '@/apis/queries/columns';
import { useGetMembersInDashboard } from '@/apis/queries/members';
import useDeviceType from '@/hooks/Common/useDeviceType';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';

import { useEffect } from 'react';

function useModalCard() {
  const { setStatus } = useSelectStatus();
  const { dashboardId } = useDashBoardId();

  const deviceType = useDeviceType();

  const { cardData } = useGetCardDetails();
  const { dashBoardColumnData } = useGetColumnList(dashboardId);
  const { data } = useGetMembersInDashboard({ dashboardId });

  const filterColumn = dashBoardColumnData?.data.filter((val) => val.id === cardData?.columnId);
  const status = filterColumn ? filterColumn[0]?.title : '';

  useEffect(() => {
    setStatus(status);
  }, [setStatus, status]);

  return { deviceType, cardData, status };
}

export default useModalCard;
