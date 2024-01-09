import { useRouter } from 'next/router';
import { useState } from 'react';

import { ApiErrorResponse, GetDashboardDetailedItem } from '@/types/api';
import API from '@/apis/api';
import {
  ALREADY_INVITE_ERROR,
  INVALID_EMAIL_ERROR,
  INVITE_AUTH_ERROR,
  NO_DASHBOARD_ERROR,
  NO_USER_ERROR,
} from '@/constants/ApiError';
import { useMutation } from '@tanstack/react-query';

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

  const inviteMutation = useMutation({
    mutationFn: (newEmail: string) =>
      API.dashboard.inviteDashboard({
        dashboardId: Number(dashboard?.id),
        email: newEmail,
      }),
    onSuccess: () => {
      alert('성공적으로 초대하기 메세지를 보냈습니다.');
      setIsModalOpen(false);
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

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

      await inviteMutation.mutateAsync(email);
    } catch (e: any) {
      alert(e.data.message);
      return;
    }
  };

  return { isModalOpen, dashboardTitle, inviteFetch, setModalValue, setIsModalOpen };
}

export default useDashboardNavbar;
