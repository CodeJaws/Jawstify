import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ApiErrorResponse,
  DashboardBasicInfoType,
  DashboardIdType,
  EmailType,
  PaginationType,
  ReactQueryReturnType,
} from '@/types/apiType';
import { request } from '@/apis/axios';
import {
  GetDashboardDetailedItem,
  GetDashboardListItem,
  GetDashboardListProps,
  LoadInviteDashboardItem,
} from '@/types/api';
import { useRouter } from 'next/router';

/** 대시보드 초대 취소 */
export const useAbortInviteDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dashboardId, invitationId }: DashboardIdType & { invitationId: number }) =>
      request.delete(`dashboards/${dashboardId}/invitations/${invitationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitedMembersInDashboard'] });
      alert('취소 성공');
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

  return { mutate, isPending, isError, error };
};

/** 대시보드 수정 */
export const useCorrectDashboard = ({ dashboardId }: DashboardIdType) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dashboardId, title, color }: DashboardIdType & DashboardBasicInfoType) => {
      return request.put(`dashboards/${dashboardId}`, { title, color });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardDetailed', dashboardId] });
      queryClient.invalidateQueries({ queryKey: ['inviteItem'] });
      alert('변경 성공');
      router.push('/mydashboard');
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

  return { mutate, isPending, isError, error };
};

/** 대시보드 삭제 */
export const useDeleteDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dashboardId }: DashboardIdType) => request.delete(`dashboards/${dashboardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteItem'] });
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

  return { mutate, isPending, isError, error };
};

/** 대시보드 상세 조회 */
export const useGetDashboardDetailed = ({
  dashboardId,
}: DashboardIdType): ReactQueryReturnType<GetDashboardDetailedItem> => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['dashboardDetailed', dashboardId],
    queryFn: async () => {
      return await request.get<GetDashboardDetailedItem>(`dashboards/${dashboardId}`);
    },
  });
  if (error) {
    const errorData = error as ApiErrorResponse;
    alert(errorData.data?.message);
  }

  return { data, error, isLoading };
};

/** 대시보드 목록 조회 */
export const useGetDashboardList = ({ navigationMethod, cursorId, page = 1, size = 10 }: GetDashboardListProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['dashboardList', page],
    queryFn: async () =>
      await request.get<GetDashboardListItem>(
        `dashboards?navigationMethod=${navigationMethod}${
          cursorId ? `&cursorId=${cursorId}` : ''
        }&page=${page}&size=${size}`,
      ),
  });

  return { data, error, isLoading };
};

/** 대시보드 초대하기 */
export const useInviteDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: ({ dashboardId, email }: DashboardIdType & EmailType) =>
      request.post(`dashboards/${dashboardId}/invitations`, { email }),
    onSuccess: () => {
      alert('성공적으로 초대하기 메세지를 보냈습니다');
      queryClient.invalidateQueries({ queryKey: ['invitedMembersInDashboard'] });
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

  return { mutate, isPending, isError, error, isSuccess };
};

/** 대시보드 초대 불러오기 */
export const useLoadInviteDashboard = ({ size = 20, page = 1, dashboardId }: DashboardIdType & PaginationType) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['invitedMembersInDashboard', page],
    queryFn: async () =>
      await request.get<LoadInviteDashboardItem>(`dashboards/${dashboardId}/invitations?page=${page}&size=${size}`),
  });

  return { data, error, isLoading };
};
