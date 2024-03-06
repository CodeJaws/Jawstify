import API from '@/apis/api';
import { request } from '@/apis/axios';
import useColumnId from '@/hooks/ModalCard/useColumnId';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import { handleReactQueryError } from '@/lib/toast';
import { CorrectColumnProps, CreateColumnProps, DeleteColumnProps, ErrorProps } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/** 컬럼 생성 */
export const useCreateColumn = (dashboardId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateColumnProps) => request.post('columns', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columnList', dashboardId] });
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 컬럼 목록 조회 */
export const useGetColumnList = (dashboardId: number) => {
  const {
    data: dashBoardColumnData,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['columnList', dashboardId],
    queryFn: async () => {
      return await API.columns.getColumnList({ dashboardId });
    },
    enabled: !!dashboardId,
  });
  return { dashBoardColumnData, isFetched, isSuccess };
};

/** 컬럼 수정 */
export const useCorrectColumn = () => {
  const queryClient = useQueryClient();

  const { columnId } = useColumnId();
  const { dashboardId } = useDashBoardId();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ columnId, title }: CorrectColumnProps) => request.put(`columns/${columnId}`, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columnList', dashboardId, columnId] });
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 컬럼 삭제 */
export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  const { dashboardId } = useDashBoardId();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ columnId }: DeleteColumnProps) => request.delete(`columns/${columnId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columnList', dashboardId] });
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 카드 이미지 업로드 */
export const uploadCardImage = () => {};
