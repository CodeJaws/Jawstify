import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import { useQuery } from '@tanstack/react-query';
import API from '../api';

/** 컬럼 생성 */
export const useCreateColumn = () => {};

/** 컬럼 목록 조회 */
export const useGetColumnList = () => {
  const { dashboardId } = useDashBoardId();
  const { data: dashBoard } = useQuery({
    queryKey: ['dashBoard', dashboardId],
    queryFn: async () => {
      return await API.columns.getColumnList({ dashboardId });
    },
    enabled: !!dashboardId,
  });
  return { dashBoard };
};

/** 컬럼 수정 */
export const useCorrectColumn = () => {};

/** 컬럼 삭제 */
export const useDeleteColumn = () => {};

/** 카드 이미지 업로드 */
export const uploadCardImage = () => {};
