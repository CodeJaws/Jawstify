import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { request } from '@/apis/axios';
import { DashboardIdType, MemberIdType, PaginationType } from '@/types/apiType';
import { ErrorProps, GetMembersInDashboardItem } from '@/types/api';
import { handleReactQueryError } from '@/lib/toast';

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
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error, isSuccess };
};

/** 대시보드 멤버 목록 조회 */
export const useGetMembersInDashboard = ({ size = 20, page = 1, dashboardId }: DashboardIdType & PaginationType) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['membersInDashboard', page],
    queryFn: async () => {
      return await request.get<GetMembersInDashboardItem>(
        `members?dashboardId=${dashboardId}&page=${page}&size=${size}`,
      );
    },
    enabled: !!dashboardId,
  });
  if (isError) handleReactQueryError(error as unknown as ErrorProps);

  return { data, error, isLoading };
};
