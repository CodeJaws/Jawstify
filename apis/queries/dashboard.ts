import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { request } from '@/apis/axios';
import { CreateDashboardProps } from '@/types/api';
import { handleReactQueryError } from '@/lib/toast';
import {
  ErrorProps,
  GetDashboardDetailedItem,
  GetDashboardListItem,
  GetDashboardListProps,
  LoadInviteDashboardItem,
} from '@/types/api';
import { QUERY_KEYS } from '@/constants/QueryKey';
import { DashboardBasicInfoType, DashboardIdType, EmailType, PaginationType } from '@/types/apiType';

/** 대시보드 생성 */
export const useCreateDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ title, color }: CreateDashboardProps) => request.post('dashboards', { title, color }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inviteItem] });
      // 여기에 대시보드 생성시 invalidateQueries를 추가하면 될 것 같네요
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 대시보드 초대 취소 */
export const useAbortInviteDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dashboardId, invitationId }: DashboardIdType & { invitationId: number }) =>
      request.delete(`dashboards/${dashboardId}/invitations/${invitationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.invitedMembersInDashboard] });
      toast.success('취소 성공');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.dashboardDetailed, dashboardId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inviteItem] });
      toast.success('변경 성공');
      router.push('/mydashboard');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 대시보드 삭제 */
export const useDeleteDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ dashboardId }: DashboardIdType) => request.delete(`dashboards/${dashboardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inviteItem] });
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 대시보드 상세 조회 */
export const useGetDashboardDetailed = ({ dashboardId }: DashboardIdType) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.dashboardDetailed, dashboardId],
    queryFn: async () => {
      return await request.get<GetDashboardDetailedItem>(`dashboards/${dashboardId}`);
    },
  });
  if (isError) handleReactQueryError(error as unknown as ErrorProps);

  return { data, error, isLoading };
};

/** 대시보드 목록 조회 */
export const useGetDashboardList = ({ navigationMethod, cursorId, page = 1, size = 10 }: GetDashboardListProps) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.dashboardList, page],
    queryFn: async () =>
      await request.get<GetDashboardListItem>(
        `dashboards?navigationMethod=${navigationMethod}${
          cursorId ? `&cursorId=${cursorId}` : ''
        }&page=${page}&size=${size}`,
      ),
  });
  if (isError) handleReactQueryError(error as unknown as ErrorProps);

  return { data, error, isLoading };
};

/** 대시보드 초대하기 */
export const useInviteDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess, context, data, failureReason } = useMutation({
    mutationFn: ({ dashboardId, email }: DashboardIdType & EmailType) =>
      request.post(`dashboards/${dashboardId}/invitations`, { email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.invitedMembersInDashboard] });
      toast.success('성공적으로 초대하기 메세지를 보냈습니다');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error, isSuccess };
};

/** 대시보드 초대 불러오기 */
export const useLoadInviteDashboard = ({ size = 20, page = 1, dashboardId }: DashboardIdType & PaginationType) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.invitedMembersInDashboard, page],
    queryFn: async () =>
      await request.get<LoadInviteDashboardItem>(`dashboards/${dashboardId}/invitations?page=${page}&size=${size}`),
    enabled: !!dashboardId,
  });
  if (isError) handleReactQueryError(error as unknown as ErrorProps);

  return { data, error, isLoading };
};
