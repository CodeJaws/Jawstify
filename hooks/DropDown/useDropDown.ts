import useImgSrc from '@/hooks/DropDown/useImgSrc';
import useInputData from '@/hooks/DropDown/useInputData';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardId from '@/hooks/ModalCard/useCardId';
import { GetCardDetailsItem, GetMembersInDashboardItem } from '@/types/api';

import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  onChange: (inputLabel: string, inputValue: string) => void;
}

function useDropDown({ onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSelectStatus();
  const { inputData, setInputData } = useInputData();
  const { imgSrc, setImgSrc } = useImgSrc();
  const { cardId } = useCardId();

  const queryClient = useQueryClient();

  const card = queryClient.getQueryData(['card', cardId]);
  const cardData = card as GetCardDetailsItem;
  const member = queryClient.getQueryData(['membersInDashboard', 1]);
  const members = member as GetMembersInDashboardItem;

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const openDropDown = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.currentTarget.value);
    if (inputData) {
      setImgSrc('');
    }
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const filterData = members?.members.filter((manager) => {
    if (inputData) {
      return manager.nickname.toLowerCase().includes(inputData.toLowerCase());
    } else {
      return manager.nickname.toLowerCase();
    }
  });

  useEffect(() => {
    onChange('상태', status);
  }, [onChange, status]);

  useEffect(() => {
    onChange('담당자', inputData);
  }, [inputData]);

  useEffect(() => {
    setInputData(cardData?.assignee.nickname);
    setImgSrc(cardData?.assignee.profileImageUrl);
  }, [setInputData, setImgSrc, cardData?.assignee.nickname, cardData?.assignee.profileImageUrl]);

  return { isOpen, handleBlur, openMenu, setIsOpen, inputData, openDropDown, filterData, status, imgSrc };
}

export default useDropDown;
