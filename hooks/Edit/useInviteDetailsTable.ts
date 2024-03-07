import { useState } from 'react';

import { useInviteDashboard } from '@/apis/queries/dashboard';
import { toast } from 'react-hot-toast';

interface useInviteDetailsTableProps {
  allItems: any;
  dashboardId: number;
}

function useInviteDetailsTable({ allItems, dashboardId }: useInviteDetailsTableProps) {
  const tableTitle = '초대 내역';
  const tableSubTitle = '이메일';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const setModalValue = (values: any) => setEmail(values['이메일']);

  const { mutate: inviteDashboardMutate, isPending, isError, error, isSuccess } = useInviteDashboard();

  const handleInvite = async () => {
    for (let i = 0; i < allItems.length; i++) {
      const check = allItems[i];
      if ('invitee' in check && check.invitee.email === email) {
        toast.error('이미 초대하신 멤버입니다.');
        return;
      }
    }

    await inviteDashboardMutate({ dashboardId, email });
    if (!isPending) {
      setIsModalOpen(false);
    }
  };

  return { isModalOpen, setIsModalOpen, tableTitle, tableSubTitle, handleInvite, setModalValue };
}

export default useInviteDetailsTable;
