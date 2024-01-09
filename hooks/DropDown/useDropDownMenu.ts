import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useCardData from '../ModalCard/useCardData';
import useColumnId from '../ModalCard/useColumnId';
import useDashBoard from '../ModalCard/useDashBoard';
import useImgSrc from './useImgSrc';
import useInputData from './useInputData';
import useManager from './useManager';
import useSelectStatus from './useSelectStatus';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function useDropDownMenu({ setIsOpen }: Props) {
  const [isCheck, setIsCheck] = useState(0);
  const { setManager } = useManager();
  const { setStatus } = useSelectStatus();
  const { setInputData } = useInputData();
  const { setImgSrc } = useImgSrc();
  const { tasks } = useDashBoard();
  const { setColumnId } = useColumnId();
  const { cardData } = useCardData();

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

  const filterColumnId = tasks.data.filter((val) => val.id === cardData.columnId)[0]?.id;

  useEffect(() => {
    setColumnId(filterColumnId);
    setManager(cardData.assignee.id);
  }, [cardData.assignee.id, filterColumnId, setColumnId, setManager]);

  return { isCheck, handleCheck, handleCheckName, tasks };
}

export default useDropDownMenu;
