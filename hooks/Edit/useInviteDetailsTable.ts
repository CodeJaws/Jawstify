import { useState } from 'react';

import API from '@/apis/api';
import { ApiErrorResponse } from '@/types/apiType';
import { InvitationType } from '@/types/apiType';
import { useMutation } from '@tanstack/react-query';

interface useInviteDetailsTableProps {
  allItems: any;
  SHOW_ITEMS_SIZE: number;
  pageNum: number;
  dashboardId: number;
}

function useInviteDetailsTable({ allItems, SHOW_ITEMS_SIZE, pageNum, dashboardId }: useInviteDetailsTableProps) {
  const tableTitle = '초대 내역';
  const tableSubTitle = '이메일';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const setModalValue = (values: any) => {
    setEmail(values['이메일']);
  };

  const inviteMutation = useMutation({
    mutationFn: ({ dashboardId, email }: { dashboardId: number; email: string }) =>
      API.dashboard.inviteDashboard({
        dashboardId,
        email,
      }),
    onSuccess: () => {
      alert('성공적으로 초대하기 메세지를 보냈습니다');
      setIsModalOpen(false);
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

  const handleInvite = async () => {
    for (let i = 0; i < allItems.length; i++) {
      const check = allItems[i];
      if ('invitee' in check && check.invitee.email === email) {
        alert('이미 초대하신 멤버입니다.');
        return;
      }
    }
    await inviteMutation.mutateAsync({ dashboardId, email });
  };

  const showItems: InvitationType[] = allItems.slice(
    (pageNum - 1) * SHOW_ITEMS_SIZE,
    (pageNum - 1) * SHOW_ITEMS_SIZE + SHOW_ITEMS_SIZE,
  );

  return { isModalOpen, showItems, setIsModalOpen, tableTitle, tableSubTitle, handleInvite, setModalValue };
}

export default useInviteDetailsTable;
