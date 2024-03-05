import useImgSrc from '@/hooks/DropDown/useImgSrc';
import useInputData from '@/hooks/DropDown/useInputData';
import useManager from '@/hooks/DropDown/useManager';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardId from '@/hooks/ModalCard/useCardId';
import useColumnId from '@/hooks/ModalCard/useColumnId';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import { GetCardDetailsItem, GetColumnListItem } from '@/types/api';

import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function useDropDownMenu({ setIsOpen }: Props) {
  const [isCheck, setIsCheck] = useState(0);
  const { setManager } = useManager();
  const { setStatus } = useSelectStatus();
  const { setInputData } = useInputData();
  const { setImgSrc } = useImgSrc();
  const { setColumnId } = useColumnId();
  const { cardId } = useCardId();
  const { dashboardId } = useDashBoardId();
  const queryClient = useQueryClient();

  const card = queryClient.getQueryData(['card', cardId]);
  const dashboard = queryClient.getQueryData(['dashBoard', dashboardId]);

  const cardData = card as GetCardDetailsItem;
  const tasks = dashboard as GetColumnListItem;

  const handleCheck = (id: number, content: string) => {
    setColumnId(id);
    setIsCheck(id);
    setIsOpen((prev) => !prev);
    setStatus(content);
  };

  const handleCheckName = (id: number, content: string, imgSrc: string) => {
    setManager(id);
    setIsOpen((prev) => !prev);
    setInputData(content);
    setImgSrc(imgSrc);
  };

  const filterColumnId = tasks?.data.filter((val) => val.id === cardData.columnId)[0]?.id;

  useEffect(() => {
    setColumnId(filterColumnId);
    setManager(cardData?.assignee.id);
  }, [cardData?.assignee.id, filterColumnId, setColumnId, setManager]);

  return { isCheck, handleCheck, handleCheckName, tasks };
}

export default useDropDownMenu;
