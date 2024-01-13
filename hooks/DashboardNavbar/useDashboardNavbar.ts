import { useRouter } from 'next/router';
import { useState } from 'react';

import API from '@/apis/api';
import { useInviteDashboard } from '@/apis/queries/dashboard';
import { ALREADY_INVITE_ERROR } from '@/constants/ApiError';
import { GetDashboardDetailedItem } from '@/types/api';

interface useDashboardNavbarProps {
  isMyDashboard: boolean;
  dashboard?: GetDashboardDetailedItem;
}

function useDashboardNavbar({ isMyDashboard, dashboard }: useDashboardNavbarProps) {
  const router = useRouter();
  const dashboardTitle = isMyDashboard
    ? '내 대시보드'
    : router.pathname === '/mypage'
      ? '계정관리'
      : dashboard
        ? dashboard.title
        : '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const setModalValue = (values: any) => setEmail(values['이메일']);

  const { mutate: inviteDashboardMutate, isPending, isError, error, isSuccess } = useInviteDashboard();

  const inviteFetch = async () => {
    if (!dashboard) return;

    try {
      const { invitations } = await API.dashboard.loadInviteDashboard({
        dashboardId: Number(dashboard.id),
        size: 100,
      });

      for (let i = 0; i < invitations.length; i++) {
        if (email === invitations[i].invitee.email) {
          alert(ALREADY_INVITE_ERROR);
          return;
        }
      }

      await inviteDashboardMutate({ dashboardId: dashboard.id, email });
      if (!isPending) {
        setIsModalOpen(false);
      }
    } catch (e: any) {
      alert(e.data.message);
      return;
    }
  };

  return { isModalOpen, dashboardTitle, inviteFetch, setModalValue, setIsModalOpen };
}

export default useDashboardNavbar;
