import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { request } from '@/apis/axios';
import { ApiErrorResponse, DashboardIdType, MemberIdType, PaginationType, ReactQueryReturnType } from '@/types/apiType';
import { GetMembersInDashboardItem } from '@/types/api';

/** 대시보드 멤버 삭제 */
export const useDeleteMemberInDashboard = ({ pageNum }: { pageNum: number }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: ({ memberId }: MemberIdType) => request.delete(`members/${memberId}`),
    mutationKey: ['membersInDashboard', pageNum],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membersInDashboard', pageNum] });
      queryClient.invalidateQueries({ queryKey: ['membersInDashboard'] });
    },
    onError: (error: ApiErrorResponse) => alert(error.data?.message),
  });

  return { mutate, isPending, isError, error, isSuccess };
};

/** 대시보드 멤버 목록 조회 */
export const useGetMembersInDashboard = ({ size = 20, page = 1, dashboardId }: DashboardIdType & PaginationType) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['membersInDashboard', page],
    queryFn: async () => {
      return await request.get<GetMembersInDashboardItem>(
        `members?dashboardId=${dashboardId}&page=${page}&size=${size}`,
      );
    },
  });

  return { data, error, isLoading };
};
