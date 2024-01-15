import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from '../api';
import { request } from '../axios';
import { CorrectColumnProps, CreateCardProps, CreateColumnProps, DeleteColumnProps, ErrorProps } from '@/types/api';
import { handleReactQueryError } from '@/lib/toast';
import useColumnId from '@/hooks/ModalCard/useColumnId';

/** 컬럼 생성 */
export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  const { dashboardId } = useDashBoardId();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateColumnProps) => request.post('columns', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columnList', dashboardId] });
      console.log('컬럼 생성 완료');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 컬럼 목록 조회 */
export const useGetColumnList = () => {
  const { dashboardId } = useDashBoardId();
  const { data: dashBoard } = useQuery({
    // TODO: queryKey: ['dashBoard', dashboardId]로 바꿔야 함.
    queryKey: ['dashBoard', dashboardId],
    queryFn: async () => {
      return await API.columns.getColumnList({ dashboardId });
    },
    enabled: !!dashboardId,
  });
  return { dashBoard };
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
      console.log('컬럼 수정 완료');
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
      console.log('컬럼 삭제 완료');
    },
    onError: (error) => handleReactQueryError(error as unknown as ErrorProps),
  });

  return { mutate, isPending, isError, error };
};

/** 카드 이미지 업로드 */
export const uploadCardImage = () => {};
